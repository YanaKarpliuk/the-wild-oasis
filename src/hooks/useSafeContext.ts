import { useContext, type Context } from 'react';

// Get context values via custom hook to avoid undefined errors.
export default function useSafeContext<T>(ReactContext: Context<T | undefined>) {
  const context = useContext(ReactContext);

  if (context === undefined) {
    throw new Error(`useSafeContext must be used within ${ReactContext}`);
  }

  return context;
}
