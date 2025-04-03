
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | undefined;
  shipmentType: string;
  requirements: string;
  createdAt: string;
  status: "pending" | "contacted" | "completed";
}

interface QuoteStore {
  quotes: QuoteRequest[];
  addQuote: (quoteData: Omit<QuoteRequest, "id" | "createdAt" | "status">) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest["status"]) => void;
  getQuotes: () => QuoteRequest[];
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      quotes: [],
      addQuote: (quoteData) => {
        const newQuote: QuoteRequest = {
          ...quoteData,
          id: `QUOTE-${Date.now().toString().slice(-10)}`,
          createdAt: new Date().toISOString(),
          status: "pending",
        };
        set((state) => ({ quotes: [...state.quotes, newQuote] }));
        return newQuote;
      },
      updateQuoteStatus: (id, status) => {
        set((state) => ({
          quotes: state.quotes.map((quote) =>
            quote.id === id ? { ...quote, status } : quote
          ),
        }));
      },
      getQuotes: () => get().quotes,
    }),
    {
      name: "quotes-storage",
    }
  )
);
