import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { logSectionVisit } from "@/api-services/website-services/visitorService";

const VisitLogger = () => {
  const { userIp } = useSelector((state) => state.admin);
  const { trackingEnabled } = useSelector((state) => state.website);
  const timesRef = useRef({});
  const hasLoggedOnHiddenRef = useRef(false);
  const observerRef = useRef(null);

  const [page, setPage] = useState(() => window.location.hash || 'Home');
  const prevPageRef = useRef(page);

  // Detect hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || 'Home';
      if (newHash !== prevPageRef.current && trackingEnabled) {
        handleUnloadOrVisibilityChange(timesRef.current, timesRef, prevPageRef.current, userIp);
        prevPageRef.current = newHash;
      }
      setPage(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [trackingEnabled, userIp]);

  // Observe sections
  useEffect(() => {
    if (!trackingEnabled) return;

    const times = timesRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!id) return;

        if (entry.isIntersecting) {
          if (!times[id]) times[id] = Date.now();
        } else if (times[id]) {
          const timeSpent = Math.round((Date.now() - times[id]) / 10) / 100;
          delete times[id];
          if (timeSpent >= 0.1 && userIp) {
            logSectionVisit({ page, section: id, ipAddress: userIp, visitDuration: timeSpent });
          }
        }
      });
    }, { threshold: 0.25 });

    observerRef.current = observer;

    const sections = document.querySelectorAll('.tracked-section');
    sections.forEach((el) => observer.observe(el));

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasLoggedOnHiddenRef.current) {
        hasLoggedOnHiddenRef.current = true;
        handleUnloadOrVisibilityChange(timesRef.current, timesRef, page, userIp);
      } else if (document.visibilityState === 'visible') {
        hasLoggedOnHiddenRef.current = false;
      }
    };

    const onBeforeUnload = () => {
      handleUnloadOrVisibilityChange(timesRef.current, timesRef, page, userIp);
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      sections.forEach((el) => observer.unobserve(el));
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      timesRef.current = {};
      hasLoggedOnHiddenRef.current = false;
    };
  }, [page, userIp, trackingEnabled]);

  return null;
};

export default VisitLogger;

const handleUnloadOrVisibilityChange = (times, timesRef, page, userIp) => {
  const now = Date.now();

  Object.entries(times).forEach(([id, startTime]) => {
    const timeSpent = Math.round((now - startTime) / 10) / 100;
    if (timeSpent >= 0.1) {
      const payload = JSON.stringify({
        page,
        section: id,
        ipAddress: userIp,
        visitDuration: timeSpent,
      });

      navigator.sendBeacon('/api/visitor/logsectionvisit', new Blob([payload], { type: 'application/json' }));
    }
  });

  timesRef.current = {};
};
