import React, { useEffect, useRef } from 'react'

export function usePreviousState(data: any){
  const ref = useRef();
  useEffect(()=>{
    ref.current = data
  }, [data])
  return ref.current
}