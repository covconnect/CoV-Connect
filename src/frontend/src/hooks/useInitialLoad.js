import { useEffect, useState } from 'react';

function useInitialLoad() {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return initialLoad;
}

export default useInitialLoad;
