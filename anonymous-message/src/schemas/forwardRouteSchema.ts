'use client'
import z from "zod";


 export const forwardRouteSchema = z.object({
    route: z.string()
    .url({ message: "Please enter a valid URL." })
    .refine((url) => {
      const baseUrl = `${window.location.protocol}//${window.location.host}/u/`; 
      return url.startsWith(baseUrl);
    }, {
      message: `URL must be in the format: ${window.location.protocol}//${window.location.host}/u/xyz`,
    })
   
 })
