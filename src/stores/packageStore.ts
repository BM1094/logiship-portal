
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TrackingEvent = {
  status: string;
  location: string;
  date: string;
  time?: string;
  description?: string;
};

export type Package = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipment: {
    type: string;
    weight: string;
    dimensions: string;
  };
  route: {
    origin: string;
    destination: string;
    estimatedDelivery: string;
  };
  description?: string;
  status: string;
  trackingHistory: TrackingEvent[];
};

type PackageStore = {
  packages: Package[];
  addPackage: (newPackage: Package) => void;
  getPackage: (id: string) => Package | undefined;
  updatePackageStatus: (id: string, status: string, location: string) => void;
};

export const usePackageStore = create<PackageStore>()(
  persist(
    (set, get) => ({
      packages: [],
      addPackage: (newPackage: Package) => 
        set(state => ({ packages: [...state.packages, newPackage] })),
      getPackage: (id: string) => 
        get().packages.find(pkg => pkg.id === id),
      updatePackageStatus: (id: string, status: string, location: string) => 
        set(state => ({
          packages: state.packages.map(pkg => 
            pkg.id === id 
              ? {
                  ...pkg,
                  status,
                  trackingHistory: [
                    ...pkg.trackingHistory,
                    {
                      status,
                      location,
                      date: new Date().toISOString(),
                    },
                  ],
                }
              : pkg
          ),
        })),
    }),
    {
      name: 'package-storage',
    }
  )
);
