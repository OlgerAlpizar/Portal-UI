export const beginUpperCase = (name?: string) => 
  name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : 'Unknown'