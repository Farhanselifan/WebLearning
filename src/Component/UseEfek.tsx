import React, { useState, useEffect } from 'react';

function useEfek() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count sekarang: ${count}`);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Tambah {count}
    </button>
  );
}

export default useEfek;