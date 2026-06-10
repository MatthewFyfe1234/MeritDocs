# **API Event Hook Architectures and User Activity Telemetry in AEC and Productivity Systems**

The engineering of modern construction processes relies on binding individual execution actions—such as geometric edits, material designations, and document reviews—to formal steps in a digital process model. To capture these actions in real time or near-real time, third-party middleware platforms must interface directly with client-side application programming interfaces (APIs) and cloud-based webhook frameworks.

## **Client-Side User Action Telemetry in Desktop Modeling Applications**

Desktop computer-aided design (CAD) and building information modeling (BIM) applications maintain local, heavy-client architectures. Capturing real-time user clickstreams within these environments requires deep hooks into local execution threads, which present significant structural differences in thread management and event propagation.

### **Autodesk Revit API Architecture and Event Models**

The Autodesk Revit API is strictly single-threaded, enforcing a execution bottleneck where all API interactions must take place on the main thread called by the Revit process.1 External applications cannot run background processes in secondary threads and asynchronously execute commands in the Revit document database.1 If an external modeless interface (such as a Windows Presentation Foundation or React-based UI) needs to interact with Revit, it must register an ExternalEvent or subscribe to the Idling event to request access to the main thread when Revit is not performing other operations.2  
Revit exposes event handling through two primary context levels, each mapped to specific API classes:

                  Revit Application Lifecycles  
                               |  
        \+----------------------+----------------------+  
        |                                             |  
                  \[UI & Interaction Events\]  
   \- Application Services                        \- UI Application Services  
   \- Classes: Application,                       \- Classes: UIApplication,  
     ControlledApplication                         ControlledUIApplication

Database and document lifecycles are monitored by the Application and ControlledApplication classes in the Autodesk.Revit.ApplicationServices namespace.5 These classes expose events that register macro-level document mutations 6:

* DocumentChanged: Fires after a database transaction is completed, notifying subscribers of added, modified, or deleted elements.5  
* DocumentOpened / DocumentClosed: Emits when a model is accessed or exited.5  
* DocumentSynchronizedWithCentral / DocumentReloadedLatest: Tracks synchronization status.6  
* FileExported / FileImported: Signals when files are transferred out of or into the database.6

User interface and interaction lifecycles are monitored by the UIApplication and UIControlledApplication classes in the Autodesk.Revit.UI namespace.7 These classes capture live user actions inside the interface 7:

* SelectionChanged: Fires when a user modifies their active selection of visual elements in the viewport.7  
* Idling: Indicates the application is in an inactive state and can receive external process commands.4  
* DialogBoxShowing: Notifies when Revit is about to display a native dialog box, allowing a plugin to intercept or suppress the window.7

To track command executions—specifically, which tools are clicked and which operations are invoked—developers must use the command binding architecture.9 By calling UIApplication.CreateAddInCommandBinding(), a developer can bind to a specific native Revit command identifier.9 The command ID is obtained by analyzing a Revit journal file to locate recorded execution commands (for example, Jrn.Command "Internal" , "Import vector data from other programs , ID\_FILE\_IMPORT").9  
The AddInCommandBinding class exposes three events that intercept user execution:

| Event Name | Description | Cancellation Support |
| :---- | :---- | :---- |
| BeforeExecuted | Fires immediately before the associated native command executes.9 | Yes (via setting Cancel \= true in BeforeExecutedEventArgs).11 |
| CanExecute | Occurs when Revit evaluates if the command is active in the current UI context.9 | No.9 |
| Executed | Fires when the command runs, allowing custom code to replace the default Revit behavior.9 | No.9 |

Third-party automation tools consume these events to monitor and control user behavior. The open-source *pyRevit* framework utilizes command-before-exec hooks (e.g., command-before-exec) to intercept import actions, allowing CAD managers to enforce model standards or block imports in real time.12

### **Trimble Tekla Structures Open API Event Handler Architecture**

The Trimble Tekla Structures Open API implements a multi-threaded, asynchronous event handling architecture.13 Registered event listeners for model changes are processed asynchronously, meaning multiple handlers can run simultaneously on different background threads.13 Because these events are decoupled from the main thread, developers must use thread synchronization techniques, such as C\# lock blocks, to protect shared resources and prevent race conditions when writing event telemetry to external databases.13  
The Events class in the Tekla.Structures.Model namespace (and the corresponding IEvents interface) exposes model-level events 13:

* CommandStatusChange: Fires when any command starts or ends in the Tekla user interface, providing real-time telemetry of user tool selections.13  
* SelectionChange / AnnotationSelectionChange: Tracks when a user changes their active selection of physical model objects or drawing annotations.13  
* ModelObjectChanged: Fires when geometric model objects are updated, added, or deleted, and is triggered during UNDO and REDO actions.13  
* UndoClicked: Fires immediately when a user clicks the undo action.13  
* ClashDetected / ClashCheckDone: Signals when clash checks are run and when individual clashes are registered in the model.13

Drawing interaction telemetry is managed by the DrawingHandler class in the Tekla.Structures.Drawing namespace.15 This handler exposes commands such as CloseActiveDrawing, IssueDrawing, and UpdateDrawing.15 However, it does not support a granular client-side clickstream event class comparable to the model-level Events class.13  
A major third-party integration that consumes these events is *BIMcollab*, which uses a native BCF (BIM Collaboration Format) Manager plugin.17 This plugin hooks into Tekla’s SelectionChange and view camera events to automatically synchronize active viewing coordinates and selected elements when a user clicks on an issue inside the BIMcollab panel.17

### **Cadwork Python API Capabilities**

Since version 27, Cadwork has included a Python API (cwapi3dpython) designed to customize and automate 3D modeling tasks.18 The API exposes core logic through structural controllers like the Element Controller, which manipulates parts, calculates lists, and manages import/export operations.18  
However, the Python API does not support event handling, user action callbacks, or real-time event-driven hook architectures.18 Developers cannot register listeners to detect when a user selects a menu item, moves an object, or activates a tool. Integration is strictly imperative, allowing scripts to execute custom sequences on demand but lacking the capability to stream real-time user activity telemetry.18 Instead, third-party integrations like the *CAD Exchanger SDK* are used to execute file-based transformations (such as converting DWG files directly into Cadwork geometry) rather than logging workspace interactions.19

### **Dietrich's and SEMA Architecture Comparison**

Dietrich's and SEMA represent traditional, specialized timber and carpentry modeling applications. Neither platform supports a publicly documented, real-time client-side event API or webhook architecture for third-party developers.  
Dietrich's is built around a proprietary CAD core that generates material lists and production records in a project-specific database, exporting static documents to Word, Excel, or PDF.21 It supports standard geometric data exchange via IFC import/export but does not expose an execution event API.22 Numerical machine control is handled through post-processors (such as Compass Software or native BTL processors) that translate finished designs into static BTL or CAM XML files for Hundegger K2 joinery machines.23  
Similarly, SEMA does not expose a public event SDK for tracking workspace operations.25 Its integrations are file-based, using DXF or DSTV (STP) formats to export SEMA structures to structural analysis applications like Dlubal RFEM 5 / RSTAB 8\.27 While SEMA supports a custom-developed connection to BIMcollab's BCF Manager to synchronize model issues, this connection is proprietary and does not offer an open event API for generic user activity tracking.17

### **MiTek Pamir and Sapphire Integration Methods**

MiTek's structural engineering platforms, Pamir and Sapphire, do not support public APIs, webhook streams, or real-time event subscription architectures.28

* **MiTek Pamir:** Operates as a heavy timber and truss design suite in Europe.28 Interoperability is achieved through static, file-based exports (DWG, DXF, and IFC).30  
* **MiTek Sapphire:** Used for residential structural BIM workflows in North America.29 Integration with modeling environments like Revit is handled through an exchange plugin that generates a static exchange file called an .mxf (MiTek Exchange File).30 This file must be manually imported and exported between Sapphire and Revit to coordinate structural changes.30 The system does not support near-real-time streaming of user clicks, tool commands, or layout revisions.30

## **Cloud-Based AEC Environments and Webhook Architectures**

In cloud-based construction management and generative design environments, user telemetry shifts from local UI threads to push-based webhook architectures. These systems monitor database changes but do not capture real-time clickstreams.

### **Autodesk Construction Cloud (ACC) & BIM 360**

Autodesk Platform Services (APS) provides a unified, publicly documented Webhooks API (v1) accompanied by.NET and TypeScript SDKs.34 The API uses a push-based model that sends JSON payloads to registered HTTPS callback endpoints when resource states mutate.35

    ACC Webhook Subsystems & Event Types  
                    |  
  \+-----------------+-----------------+  
  |                                   |  
               \[ACC Issues\]  
  \- dm.version.added              \- issue.created-1.0  
  \- dm.version.modified           \- issue.updated-1.0  
  \- dm.lineage.reserved           \- issue.deleted-1.0  
  \- model.sync (Revit Cloud)      \- issue.unlinked-1.0

The Webhooks API covers several major ACC subsystems 34:

* **Data Management (data system):** Pushes notifications for document changes, including dm.version.added, dm.version.modified, dm.version.deleted, dm.version.moved, and file access locks (dm.lineage.reserved, dm.lineage.unreserved).38  
* **Revit Cloud Worksharing:** Triggers model.sync and model.publish events when designers synchronize desktop revisions with central cloud models.38  
* **ACC Issues (autodesk.construction.issues system):** Exposes issue.created-1.0, issue.updated-1.0, issue.deleted-1.0, issue.restored-1.0, and issue.unlinked-1.0 (which triggers when an issue is unlinked from its geometric coordinates).34  
* **ACC Reviews:** Emits events when documents enter or exit formal design review stages (review.created-1.0, review.closed-1.0).38  
* **Cost Management (autodesk.construction.cost system):** Sends events for financial mutations, including budget.created-1.0, budget.deleted-1.0, contract.created-1.0, and change orders (oco.created-1.0, pco.created-1.0).38  
* **BuildingConnected:** Tracks pre-construction bid lifecycles via bid.created, opportunity.created, and opportunity.status.updated.34

ACC webhooks capture macro-level database changes, but they do not provide real-time telemetry on active user sessions, viewport locations, or intermediate, uncommitted modeling steps.34

### **Procore Webhook Capabilities**

Procore supports a publicly documented webhook engine at both the Company and Project levels.42 This engine sends HTTP POST payloads to external HTTPS endpoints.44 External applications must return a 2xx HTTP response within a 5-second timeout and process any downstream logic asynchronously to maintain connection stability.44  
Beyond basic document uploads, Procore webhooks expose updates across various construction management tools 44:

* **RFIs & Submittals:** Triggers New RFI and Submittal Updated notifications instantly.45  
* **Field Operations:** Triggers New Inspection, New Punch Item, Task Updated, and New Meeting events.45  
* **Financials:** Tracks change events, subcontracts, and budget adjustments through New Change Event and New Prime Contract triggers.45  
* **Labor Tracking:** Tracks timesheet updates using the New Timesheet Entry and New Timesheet events.45

Procore webhook payloads include key metadata, such as company\_id, project\_id, user\_id (identifying the specific user who initiated the event), resource\_type, resource\_id, timestamp, and a unique event ulid for idempotency.44 The current v4.0.0 payload version standardizes resource IDs as strings and maps the action type to the reason field (e.g., "update" or "create").44

JSON  
{  
  "id": "01JMYXMZRBVKK0PC6XS8SA4QRE",  
  "timestamp": "2025-02-25T16:04:43.619085Z",  
  "reason": "update",  
  "company\_id": "8",  
  "project\_id": "6778",  
  "user\_id": "5447",  
  "resource\_type": "Direct Cost Line Items",  
  "resource\_id": "379913"  
}

A key technical constraint of Procore’s directory architecture is the fanout risk associated with project-level contact synchronizations.46 Previously, updating a single contact in the Project Directory triggered separate update events for every project to which that contact was assigned, generating significant webhook traffic.46 To mitigate this issue, Procore is deprecating the update event on Project Users and Project Vendors triggers effective June 30, 2026, requiring integrations to migrate to the centralized Company Users and Company Vendors triggers.46

### **Autodesk Forma (formerly Spacemaker) API**

Autodesk Forma, a cloud-based generative design platform, supports a client-side extension model using the forma-embedded-view-sdk.47 This SDK allows developers to build local web panel extensions that run within iframes inside the active Forma workspace and interact with the scene.47  
The client-side SDK exposes several APIs for tracking user activity:

* **Selection API:** Developers can call Forma.selection.getSelection() asynchronously to retrieve the unique paths of all model elements currently selected by the user.48  
* **Viewer Events:** The underlying 3D viewer allows extensions to register event listeners to detect selection changes (Autodesk.Viewing.SELECTION\_CHANGED\_EVENT) in real time.50  
* **Environmental & Sun APIs:** SDK methods like Forma.sun.getDate() and Forma.sun.setDate() track and manipulate real-time solar positioning in the workspace.51

At the cloud level, Forma integrates with the standard APS Webhooks engine, but its cloud-side events are limited to Issues (issue.created-1.0) and Reviews.38 There is no cloud-side webhook stream that captures live geometric modifications or active modeling actions outside the client-side session.38

## **Enterprise Productivity Suite Monitoring: Microsoft Graph and M365 Audit Log**

To track user compliance across standard productivity tools (Word, Excel, Teams, SharePoint), third-party engines can interface with two Microsoft 365 development boundaries: Microsoft Graph Change Notifications and the Office 365 Management Activity API.

### **Microsoft Graph Change Notifications**

Microsoft Graph change notifications use a real-time webhook model to push alerts to registered HTTPS callback endpoints.52 Subscribers can request basic notifications (which contain only the changed resource ID) or rich notifications (which include encrypted resource data, eliminating the need to query Microsoft Graph for the change details).53  
For user activity monitoring, Graph change notifications support several resource paths 53:

* **Microsoft Teams:** Track changes across all chats (/chats), channels (/teams/getAllChannels), messages (/teams/getAllMessages), and team memberships (/teams/{id}/members).54  
* **SharePoint and OneDrive:** Subscriptions to the /driveItem resource path track when files are accessed, modified, checked in, or shared.53  
* **Copilot Interactions:** Subscriptions to Copilot aiInteraction track user queries and interactions in real time.53

While Graph change notifications excel at real-time resource tracking, they do not record micro-actions within document editors (such as a user typing inside Word or editing a specific cell in Excel).

### **M365 Audit Log and Office 365 Management Activity API**

The Office 365 Management Activity API is a REST service that aggregates user, administrator, system, and policy events into five tenant-specific content blobs: Audit.AzureActiveDirectory, Audit.Exchange, Audit.SharePoint, Audit.General, and DLP.All.56 Access requires app registration in Entra ID and authorization with the ActivityFeed.Read permission claim.56  
Subscriptions are configured by content type.56 Once a subscription is active, Microsoft aggregates events into content blobs that are retrieved either by polling the endpoint or by registering a webhook to receive push notifications when new blobs become available.56  
All retrieved events follow a structured format comprising a **Common Schema** and several **Service-Specific Schemas**.57

      M365 Management Activity API Schema  
                       |  
  \+--------------------+--------------------+  
  |                                         |  
                     
  \- Id (GUID)                        \- SharePoint File Operations  
  \- RecordType                         (FileDownloaded, FileModified)  
  \- CreationTime (UTC)               \- Teams Schema  
  \- Operation                          (TeamCreated, ChannelAdded)  
  \- UserId (UPN)                     \- Copilot & Agent 365

The Common Schema provides the core parameters for every audited event 57:

| Field Name | Data Type | Mandatory | Description |
| :---- | :---- | :---- | :---- |
| **Id** | GUID | Yes | Unique identifier of the audit record.57 |
| **RecordType** | Integer | Yes | Maps to the service type (e.g., 4 for SharePoint, 25 for Teams).57 |
| **CreationTime** | DateTime | Yes | UTC timestamp indicating when the action occurred.57 |
| **Operation** | String | Yes | The friendly name of the audited user or admin action.57 |
| **ObjectId** | String | No | Target resource path (e.g., full URL of a SharePoint file).57 |
| **UserId** | String | Yes | User Principal Name (UPN) of the initiating actor.57 |
| **ResultStatus** | String | No | Execution outcome of the action (e.g., Succeeded, Failed).57 |

Building on the Common Schema, service-specific schemas append properties for specific application actions 57:

* **SharePoint File Operations Schema:** Records specific user file events, such as FileDownloaded, FileModified, FileUploaded, FileCheckedIn, and sharing actions.57 This tracks exactly who modified a design document on SharePoint and when.  
* **Microsoft Teams Schema:** Captures events including team creation, channel additions, and user membership updates.57 A key technical constraint of Teams audit logging involves membership changes made via Entra ID or the M365 Admin Portal: the log attributes these actions to an existing team owner as the initiator rather than the actual administrator who performed the update.58  
* **Copilot & Agent 365 Schemas:** Tracks user queries to Copilot, the application context in which the query occurred, and any referenced files.57 It also audits AI agent operations, including tool executions (AIExecuteTool), agent invocations (AIInvokeAgent), and model inference calls (AIInferenceCall).59

## **Technical Feasibility of Unified Process Compliance Monitoring**

Integrating these diverse client-side and cloud-side telemetry streams into a single compliance feed requires assessing existing aggregation platforms, academic research, and industry standards.

### **AEC Event Aggregation Middleware: Speckle**

There is no commercial enterprise middleware designed to aggregate client-side desktop UI clickstreams (such as tracking "user activated wall tool in Revit" and "user clicked undo in Tekla") into a single activity feed. However, *Speckle* serves as an open-source model data platform that addresses this integration challenge at the data level.60  
Rather than exchanging static files (like IFC or DWG), Speckle uses desktop connectors (for Revit, Rhino, Archicad, Blender, and others) to decompose design models into granular, versioned data objects.60 These objects are streamed in near-real-time to a central database.60  
Through its "Speckle Intelligence" layer, Speckle functions as a model data governance and monitoring hub 60:

* **Versioning and Auditing:** Tracks model modifications over time, allowing teams to push, query, and diff physical elements.60  
* **Validation and Compliance:** Enables users to track element modifications between design versions and programmatically validate models against project standards.60  
* **Data Lake Integration:** Streams change metrics directly to enterprise data lakes (such as Snowflake, Databricks, or Microsoft Fabric) to analyze cost, carbon, and progress metrics.60

While Speckle is a powerful middleware for tracking model revisions, it is data-centric rather than application-telemetry-centric. It logs *what* physical elements were modified, but does not capture active user session interactions or command sequences in the local CAD workspace.

### **Research on Application Telemetry in Construction**

Academic and industry research on the use of active application telemetry for design process compliance is limited. The majority of telemetry research in construction focuses on physical site logistics—specifically connecting physical IoT sensors (such as RFID or Bluetooth tags) to virtual BIM elements to establish real-time asset tracking and digital twin synchronization.61 For example, research has demonstrated telemetry pipelines that transmit spatial coordinates from physical RFID sensors on a construction site to update element status inside a Revit model.61  
Within software environments, telemetry is currently restricted to vendor-managed, diagnostic pipelines rather than open process-compliance frameworks. The primary development in this area is the **Autodesk Model Analytics** public beta, released in January 2026\.62 This service tracks model performance metrics (including database synchronization times, central file size growth rates, and model change patterns) directly within the Autodesk Construction Cloud (ACC).62 Model Analytics captures user activity frequencies and version alignment metrics to evaluate model health and prevent file corruption.62 However, this telemetry remains locked inside Autodesk's proprietary ecosystem and is not accessible as an open stream for third-party compliance engines.

### **OpenTelemetry (OTel) in Construction Software**

The OpenTelemetry (OTel) standard—a vendor-neutral, open-source framework designed to standardize the collection, processing, and exportation of application telemetry (metrics, logs, and traces) 63—has **zero adoption** among major desktop AEC authoring software vendors.  
While OpenTelemetry is widely implemented by cloud platform providers and API gateways (such as Tyk) to monitor distributed web services, troubleshoot cloud microservices, and log API request latencies 63, desktop applications like Autodesk Revit, Trimble Tekla, SEMA, and Cadwork do not deploy OTel agents inside their local execution threads.18  
Because legacy desktop authoring engines are built on proprietary, single-threaded, and offline-first architectures 1, they lack the modern instrumentation layers necessary to emit standardized distributed traces. As a result, third-party platforms aiming to build process compliance models cannot rely on standard OTel collectors. Instead, they must write custom, application-specific plugins to hook into local APIs, manually marshal the data into threads, and transmit those events to external telemetry aggregation services.

## **Architectural Comparison of Event Architectures**

The following table compares the event architectures across the evaluated desktop authoring applications, cloud platforms, and productivity suites:

| System / Application | Event API / Webhook Existence | Specific Event Types Captured | Documentation Access | Existing Telemetry Integrations | Telemetry Granularity & Limitations |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Autodesk Revit** | **Yes** (Desktop SDK) 1 | DocumentChanged 5, SelectionChanged 7, BeforeExecuted.9 | Publicly Documented 1 | pyRevit 12, Autodesk Model Analytics.62 | Granular command bindings 9; limited by single-threaded blocking.1 |
| **Trimble Tekla Structures** | **Yes** (Desktop SDK) 13 | CommandStatusChange, SelectionChange, ModelObjectChanged, UndoClicked.13 | Publicly Documented 13 | BIMcollab BCF Manager 17, Simpson Strong-Tie.64 | Real-time command status and selection updates; asynchronous thread safety required.13 |
| **Cadwork** | **No** (Event-driven API) 18 | N/A (Imperative Python scripting only).18 | Publicly Documented (Python Guide) 18 | CAD Exchanger SDK (static file conversions).20 | No workspace callbacks or event listeners supported.18 |
| **Dietrich's** | **No** 22 | N/A.21 | No Public Developer Portal | Compass Software (static BTL code transfer).24 | No developer API or webhook engine.22 |
| **SEMA** | **No** 17 | N/A.17 | No Public Developer Portal | BIMcollab BCF Manager (proprietary issue integration).17 | No developer API or webhook engine.17 |
| **MiTek (Pamir & Sapphire)** | **No** 30 | N/A.30 | No Public Developer Portal | Revit MXF Exchange plugin (static file exchange).30 | Static file-based exports (MXF, DWG, IFC) only.30 |
| **Autodesk Construction Cloud (ACC)** | **Yes** (APS Webhooks API) 34 | dm.version.added 38, model.sync 38, issue.created-1.0 41, review.closed-1.0.38 | Publicly Documented 35 | Model Derivative, ACC Cost Management integrations.34 | High-level database mutations; no real-time viewport or workspace telemetry.34 |
| **Procore** | **Yes** (Company / Project Webhooks) 44 | Create, Update, and Delete on Bids, Direct Costs, RFIs, Timesheets.44 | Publicly Documented 44 | Zapier 45, Datagrid.65 | Captures the initiating user ID 44; limited to database changes, no workspace tracking.44 |
| **Autodesk Forma** | **Yes** (Embedded SDK & Webhooks) 38 | Forma.selection.getSelection() 48, issue.created-1.0.38 | Publicly Documented 47 | BIMcollab online viewer integration.17 | Live viewport selections 48; webhooks are limited to issues and reviews.38 |
| **Microsoft 365 (Graph & Audit API)** | **Yes** (Graph Webhooks & Activity API) 52 | FileDownloaded, FileModified, ChannelAdded, AIExecuteTool.57 | Publicly Documented 52 | Enterprise SIEM tools.66 | Comprehensive file and Teams tracking; no keystroke or cell-level telemetry inside editors.57 |

## **Architectural Synthesis and Recommendations**

To build a unified process model that monitors user operations for compliance and quality verification, developers face a significant architectural gap:

                     
   \- Revit / Tekla UI                           \- ACC / Procore Webhooks  
   \- High-granularity actions                   \- High-stability triggers  
   \- No open stream standards                   \- Standard HTTPS payloads  
         \\                                           /  
          \+---\> \[Unified Compliance Engine\] \<-------+

1. **Desktop-to-Cloud Telemetry Gap:** Desktop modeling applications (Revit and Tekla) capture granular user actions, such as tool invocations and element selections.9 However, these applications lack native, standard mechanisms to stream this data directly to the cloud. They operate on single-threaded or asynchronously complex local runtimes that do not support modern observability standards like OpenTelemetry.1  
2. **Cloud Webhook Limitations:** Cloud collaboration platforms (ACC and Procore) provide stable, secure webhook engines.34 However, these are strictly transactional, database-level triggers (e.g., "RFI Created", "File Version Uploaded").40 They do not capture real-time user behavior or active modeling steps.  
3. **Lack of Standardization:** The absence of OpenTelemetry or other standard protocols in desktop CAD/BIM engines requires developers to write custom, application-specific plugins to hook into local APIs, manually marshal the data into background threads, and transmit those events to external telemetry aggregation services.63

### **Recommended Implementation Strategy**

For a third-party platform aiming to construct a unified compliance feed, the recommended approach is a hybrid instrumentation strategy:

* **For Desktop Actions:** Deploy custom local add-ins using Revit's AddInCommandBinding and Tekla's Events class.9 These add-ins must intercept user selections and commands, queue them locally to avoid blocking the main UI thread, and stream them asynchronously to an external endpoint.  
* **For Collaborative Actions:** Subscribe to the Microsoft Graph and M365 Management Activity APIs to track parallel business operations, such as document modifications in SharePoint and communication events in Teams.53  
* **For Cloud Deliverables:** Listen to ACC or Procore webhooks to verify when milestone deliverables (such as drawings, cost entries, or RFIs) are created or modified.38  
* **For Aggregation and Compliance:** Route these streams into an external, unified data pipeline (such as Speckle or an enterprise data warehouse) to correlate user actions with project outcomes and verify process compliance.60

#### **Works cited**

1. Deployment Options, accessed on May 26, 2026, [http://help.autodesk.com/cloudhelp/2018/ENU/Revit-API/Revit\_API\_Developers\_Guide/Introduction/Getting\_Started/Using\_the\_Autodesk\_Revit\_API/Deployment\_Options.html](http://help.autodesk.com/cloudhelp/2018/ENU/Revit-API/Revit_API_Developers_Guide/Introduction/Getting_Started/Using_the_Autodesk_Revit_API/Deployment_Options.html)  
2. Revit API How to make a external command run asynchrously? \- Stack Overflow, accessed on May 26, 2026, [https://stackoverflow.com/questions/52161965/revit-api-how-to-make-a-external-command-run-asynchrously](https://stackoverflow.com/questions/52161965/revit-api-how-to-make-a-external-command-run-asynchrously)  
3. Revit API Context \- ricaun, accessed on May 26, 2026, [https://ricaun.com/revit-api-context/](https://ricaun.com/revit-api-context/)  
4. Can you chain Idling events? \- Forums, Autodesk, accessed on May 26, 2026, [https://forums.autodesk.com/t5/revit-api-forum/can-you-chain-idling-events/td-p/11484370](https://forums.autodesk.com/t5/revit-api-forum/can-you-chain-idling-events/td-p/11484370)  
5. ApiDocs.co · Revit · ControlledApplication Members, accessed on May 26, 2026, [https://apidocs.co/apps/revit/2019.1/b69e9d33-3c49-e895-3267-7daabab85fdf.htm](https://apidocs.co/apps/revit/2019.1/b69e9d33-3c49-e895-3267-7daabab85fdf.htm)  
6. Application Class \- Revit API Docs, accessed on May 26, 2026, [https://www.revitapidocs.com/2026/94db8ea8-d2c3-5e71-8030-466bcb8e4426.htm](https://www.revitapidocs.com/2026/94db8ea8-d2c3-5e71-8030-466bcb8e4426.htm)  
7. UIControlledApplication Events \- Revit API Docs, accessed on May 26, 2026, [https://www.revitapidocs.com/2025/418cd49d-9c2f-700f-3db2-fcbe8929c5e5.htm](https://www.revitapidocs.com/2025/418cd49d-9c2f-700f-3db2-fcbe8929c5e5.htm)  
8. UIControlledApplication Class \- Revit API Docs, accessed on May 26, 2026, [https://www.revitapidocs.com/2026/4638c568-a118-1d57-ceed-a57595202644.htm](https://www.revitapidocs.com/2026/4638c568-a118-1d57-ceed-a57595202644.htm)  
9. Commands \- Autodesk product documentation, accessed on May 26, 2026, [https://help.autodesk.com/cloudhelp/2018/ENU/Revit-API/Revit\_API\_Developers\_Guide/Advanced\_Topics/Commands.html](https://help.autodesk.com/cloudhelp/2018/ENU/Revit-API/Revit_API_Developers_Guide/Advanced_Topics/Commands.html)  
10. How to override commands in the Revit UI (when you REALLY don't want people to import CAD files) \- Boost Your BIM, accessed on May 26, 2026, [https://boostyourbim.wordpress.com/2013/01/14/how-to-override-commands-in-the-revit-ui-if-you-really-dont-want-people-to-import-cad-files/](https://boostyourbim.wordpress.com/2013/01/14/how-to-override-commands-in-the-revit-ui-if-you-really-dont-want-people-to-import-cad-files/)  
11. BeforeExecutedEventArgs Class \- Revit API Docs, accessed on May 26, 2026, [https://www.revitapidocs.com/2026/fa2b2985-1b98-420c-556a-3888b7929a5a.htm](https://www.revitapidocs.com/2026/fa2b2985-1b98-420c-556a-3888b7929a5a.htm)  
12. Command-exec hook \- Revit API \- pyRevit Forums, accessed on May 26, 2026, [https://discourse.pyrevitlabs.io/t/command-exec-hook/407](https://discourse.pyrevitlabs.io/t/command-exec-hook/407)  
13. Events Class | Tekla Developer Center, accessed on May 26, 2026, [https://developer.tekla.com/doc/tekla-structures/2025/events-class-52530](https://developer.tekla.com/doc/tekla-structures/2025/events-class-52530)  
14. IEvents Interface | Tekla Developer Center, accessed on May 26, 2026, [https://developer.tekla.com/doc/tekla-structures/2025/i-events-interface-52741](https://developer.tekla.com/doc/tekla-structures/2025/i-events-interface-52741)  
15. DrawingHandler Class | Tekla Developer Center \- Trimble, accessed on May 26, 2026, [https://developer.tekla.com/doc/tekla-structures/2026/drawing-handler-class-67403](https://developer.tekla.com/doc/tekla-structures/2026/drawing-handler-class-67403)  
16. DrawingHandler Methods | Tekla Developer Center \- Trimble, accessed on May 26, 2026, [https://developer.tekla.com/doc/tekla-structures/2026/drawing-handler-methods-67405](https://developer.tekla.com/doc/tekla-structures/2026/drawing-handler-methods-67405)  
17. BIMcollab integrations, accessed on May 26, 2026, [https://helpcenter.bimcollab.com/en/articles/339409-bimcollab-integrations](https://helpcenter.bimcollab.com/en/articles/339409-bimcollab-integrations)  
18. Cadwork Python Documentation \- Cadwork Documentation, accessed on May 26, 2026, [https://docs.cadwork.com/projects/cwapi3dpython](https://docs.cadwork.com/projects/cwapi3dpython)  
19. Convert DWG to cadwork \- CAD Exchanger, accessed on May 26, 2026, [https://cadexchanger.com/dwg-to-cadwork/](https://cadexchanger.com/dwg-to-cadwork/)  
20. Cadwork integrates CAD Exchanger SDK into its Lexocad application to seamlessly convert customer 3D data, accessed on May 26, 2026, [https://cadexchanger.com/customers/cadwork-integrates-cad-exchanger-sdk-into-its-lexocad-application-to-seamlessly-convert-customer-3d-data/](https://cadexchanger.com/customers/cadwork-integrates-cad-exchanger-sdk-into-its-lexocad-application-to-seamlessly-convert-customer-3d-data/)  
21. Prefab and Element Construction \- Dietrich's, accessed on May 26, 2026, [https://www.dietrichs.com/na/solutions/prefab-and-element-construction/](https://www.dietrichs.com/na/solutions/prefab-and-element-construction/)  
22. Timber Frame \- Dietrich's, accessed on May 26, 2026, [https://www.dietrichs.com/na/use-case/timber-frame/](https://www.dietrichs.com/na/use-case/timber-frame/)  
23. RECIPROFRAME TIMBER GRIDSHELL From CAM Data Interface Modeling to Operating Industrial Joinery Machine for Scaling up Reusable T \- CAADRIA 2024, accessed on May 26, 2026, [https://caadria2024.org/wp-content/uploads/2024/04/360-RECIPROFRAME-TIMBER-GRIDSHELL.pdf](https://caadria2024.org/wp-content/uploads/2024/04/360-RECIPROFRAME-TIMBER-GRIDSHELL.pdf)  
24. CAM/CNC Software » Taglieber Holzbau, accessed on May 26, 2026, [https://www.compass-software.de/us/case-studies/taglieber-holzbau-gmbh](https://www.compass-software.de/us/case-studies/taglieber-holzbau-gmbh)  
25. Tools \- SEMA Software, accessed on May 26, 2026, [https://www.sema-soft.com/en/support/tools](https://www.sema-soft.com/en/support/tools)  
26. Hardware Recommendations | SEMA, accessed on May 26, 2026, [https://www.sema-soft.com/en/support/hardware-recommendations/](https://www.sema-soft.com/en/support/hardware-recommendations/)  
27. Building Information Modeling (BIM) \- Dlubal, accessed on May 26, 2026, [https://www.dlubal.com/en/solutions/application-areas/building-information-modeling-bim/what-is-bim](https://www.dlubal.com/en/solutions/application-areas/building-information-modeling-bim/what-is-bim)  
28. MiTek PAMIR: The World's Leading Truss Software \- YouTube, accessed on May 26, 2026, [https://www.youtube.com/watch?v=lhAOGTXUnH0](https://www.youtube.com/watch?v=lhAOGTXUnH0)  
29. Software \- MiTek Residential Construction Industry, accessed on May 26, 2026, [https://www.mitek-us.com/software/](https://www.mitek-us.com/software/)  
30. Coordination with Mitek Truss 3d model? : r/bim \- Reddit, accessed on May 26, 2026, [https://www.reddit.com/r/bim/comments/vgyatx/coordination\_with\_mitek\_truss\_3d\_model/](https://www.reddit.com/r/bim/comments/vgyatx/coordination_with_mitek_truss_3d_model/)  
31. uA433v2 \- 3D model by MAGDA\_OZIMEK \- Sketchfab, accessed on May 26, 2026, [https://sketchfab.com/3d-models/ua433v2-1d820a2f24ed4b86bdf889775d7fa7df](https://sketchfab.com/3d-models/ua433v2-1d820a2f24ed4b86bdf889775d7fa7df)  
32. Solved: Fixing hip roof corners \- Graphisoft Community, accessed on May 26, 2026, [https://community.graphisoft.com/t5/Modeling/Fixing-hip-roof-corners/td-p/587060](https://community.graphisoft.com/t5/Modeling/Fixing-hip-roof-corners/td-p/587060)  
33. Framing / Developer BIM Options? \- Reddit, accessed on May 26, 2026, [https://www.reddit.com/r/bim/comments/j5wwlg/framing\_developer\_bim\_options/](https://www.reddit.com/r/bim/comments/j5wwlg/framing_developer_bim_options/)  
34. Sort Enum | Webhooks API \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/webhooks/v1/reference/dot-net-sdk/Autodesk.Webhooks.Model/Sort](https://aps.autodesk.com/en/docs/webhooks/v1/reference/dot-net-sdk/Autodesk.Webhooks.Model/Sort)  
35. Webhooks API | Autodesk Platform Services (APS), accessed on May 26, 2026, [https://aps.autodesk.com/developer/overview/webhooks-api](https://aps.autodesk.com/developer/overview/webhooks-api)  
36. Webhooks SDK: Empowering Your Apps to Connect with APS Events (Now with TypeScript Support\!) | Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/blog/webhooks-sdk-empowering-your-apps-connect-aps-events-now-typescript-support](https://aps.autodesk.com/blog/webhooks-sdk-empowering-your-apps-connect-aps-events-now-typescript-support)  
37. Developer's Guide | Webhooks API \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/webhooks/v1/developers\_guide](https://aps.autodesk.com/en/docs/webhooks/v1/developers_guide)  
38. Status Enum | Webhooks API \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/webhooks/v1/reference/dot-net-sdk/Autodesk.Webhooks.Model/Status](https://aps.autodesk.com/en/docs/webhooks/v1/reference/dot-net-sdk/Autodesk.Webhooks.Model/Status)  
39. dm.lineage.unreserved | Webhooks API \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/data\_management\_events/dm.lineage.unreserved](https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/data_management_events/dm.lineage.unreserved)  
40. Supported Events Reference | Webhooks API \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/](https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/)  
41. Forma Issues | Webhooks API \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/issues\_events](https://aps.autodesk.com/en/docs/webhooks/v1/reference/events/issues_events)  
42. List Project Webhooks Triggers \- Rest API Overview, accessed on May 26, 2026, [https://developers.procore.com/reference/rest/triggers](https://developers.procore.com/reference/rest/triggers)  
43. Configure Project Webhooks \- Procore Support, accessed on May 26, 2026, [https://v2.support.procore.com/product-manuals/admin-project/tutorials/configure-webhooks](https://v2.support.procore.com/product-manuals/admin-project/tutorials/configure-webhooks)  
44. Introduction to Webhooks \- Procore Developers, accessed on May 26, 2026, [https://developers.procore.com/documentation/webhooks](https://developers.procore.com/documentation/webhooks)  
45. Procore Webhooks by Zapier Integration \- Quick Connect, accessed on May 26, 2026, [https://zapier.com/apps/procore/integrations/webhook](https://zapier.com/apps/procore/integrations/webhook)  
46. Deprecation: Project Directory Update Webhooks \- Procore Developers, accessed on May 26, 2026, [https://developers.procore.com/documentation/webhook-fanout-migration](https://developers.procore.com/documentation/webhook-fanout-migration)  
47. Getting started | Forma Site Design API (Beta) \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/forma/v1/overview/getting-started](https://aps.autodesk.com/en/docs/forma/v1/overview/getting-started)  
48. Tutorial | Forma Site Design API (Beta) | Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/forma/v1/embedded-views/tutorial](https://aps.autodesk.com/en/docs/forma/v1/embedded-views/tutorial)  
49. Solved: How to get house templates of each house in a house row \- Autodesk Community, accessed on May 26, 2026, [https://forums.autodesk.com/t5/forma-site-design-developer/how-to-get-house-templates-of-each-house-in-a-house-row/td-p/13396421](https://forums.autodesk.com/t5/forma-site-design-developer/how-to-get-house-templates-of-each-house-in-a-house-row/td-p/13396421)  
50. Events | Viewer \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/viewer/v6/tutorials/events](https://aps.autodesk.com/en/docs/viewer/v6/tutorials/events)  
51. Shadow Study | Forma Site Design API (Beta) \- Autodesk Platform Services, accessed on May 26, 2026, [https://aps.autodesk.com/en/docs/forma/v1/embedded-views/examples/shadow-study](https://aps.autodesk.com/en/docs/forma/v1/embedded-views/examples/shadow-study)  
52. Receive change notifications through webhooks \- Microsoft Graph, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks](https://learn.microsoft.com/en-us/graph/change-notifications-delivery-webhooks)  
53. Set up notifications for changes in resource data \- Microsoft Graph, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/graph/change-notifications-overview](https://learn.microsoft.com/en-us/graph/change-notifications-overview)  
54. Set up Microsoft Graph change notifications with resource data, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/graph/change-notifications-with-resource-data](https://learn.microsoft.com/en-us/graph/change-notifications-with-resource-data)  
55. Change notifications for Microsoft Teams resources \- Microsoft Graph, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/graph/teams-change-notification-in-microsoft-teams-overview](https://learn.microsoft.com/en-us/graph/teams-change-notification-in-microsoft-teams-overview)  
56. Office 365 Management Activity API reference | Microsoft Learn, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-reference](https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-reference)  
57. Office 365 Management Activity API schema | Microsoft Learn, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema](https://learn.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-schema)  
58. Search the audit log for events in Microsoft Teams, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/purview/audit-teams-audit-log-events](https://learn.microsoft.com/en-us/purview/audit-teams-audit-log-events)  
59. Audit log activities | Microsoft Learn, accessed on May 26, 2026, [https://learn.microsoft.com/en-us/purview/audit-log-activities](https://learn.microsoft.com/en-us/purview/audit-log-activities)  
60. Speckle: the open-source cloud data platform \- AEC Magazine, accessed on May 26, 2026, [https://aecmag.com/features/speckle-the-open-source-cloud-data-platform/](https://aecmag.com/features/speckle-the-open-source-cloud-data-platform/)  
61. Implementation of the telemetric integration of the BIM-RFID in context of access control \- ScienceOpen, accessed on May 26, 2026, [https://www.scienceopen.com/document\_file/3dd45cf2-fb93-4117-9b01-0991e2788d44/ScienceOpenPreprint/ENG\_manuscript\_BIM-RFID\_CiI.pdf](https://www.scienceopen.com/document_file/3dd45cf2-fb93-4117-9b01-0991e2788d44/ScienceOpenPreprint/ENG_manuscript_BIM-RFID_CiI.pdf)  
62. Model Analytics Public Beta: What Happens When Insight Is Embedded, Not Added? A New Era for Model Health in Autodesk Construction Cloud \- AEC Tech Drop, accessed on May 26, 2026, [https://www.autodesk.com/blogs/aec/2026/01/27/model-analytics-public-beta/](https://www.autodesk.com/blogs/aec/2026/01/27/model-analytics-public-beta/)  
63. What is OpenTelemetry? \- Tyk API Management, accessed on May 26, 2026, [https://tyk.io/learning-center/what-is-opentelemetry/](https://tyk.io/learning-center/what-is-opentelemetry/)  
64. BIM & CAD Library \- Simpson Strong-Tie, accessed on May 26, 2026, [https://www.strongtie.co.uk/en-UK/bim-cad-library](https://www.strongtie.co.uk/en-UK/bim-cad-library)  
65. Procore \+ Datagrid Integration: Automate Workflows, accessed on May 26, 2026, [https://datagrid.com/integrations/procore](https://datagrid.com/integrations/procore)  
66. Microsoft Teams Audit Log Guide: Monitoring & Reporting \- nBold, accessed on May 26, 2026, [https://nboldapp.com/microsoft-teams-audit-log-guide-monitoring-and-reporting/](https://nboldapp.com/microsoft-teams-audit-log-guide-monitoring-and-reporting/)