import { z } from "zod";

// Validação com Zod
export const deviceSchema = z.object({
    name: z.string().min(1, 'Device name is required'),
    vendor: z.string().min(1, 'Vendor is required'),
    product: z.string().min(1, 'Product is required'),
    dork: z.string().min(1, 'Dork is required'),
    version: z.string().optional(),
  });



export type AddDeviceValues = z.infer<typeof deviceSchema>;