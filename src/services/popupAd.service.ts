import { supabaseBrowser } from '@/lib/supabase/client';

export type PopupAd = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  question: string;
  answers: string[];
  image_url: string | null;
  business_name: string;
  street_ids: number[];
  active: boolean;
  phone: string | null;
  email: string | null;
  website: string | null;
};

/**
 * Service for managing popup advertisements
 */
export const popupAdService = {
  /**
   * Get an active popup ad for a specific street
   * Returns a random active ad that targets the given street
   */
  async getAdForStreet(streetId: number): Promise<PopupAd | null> {
    try {
      const { data, error } = await supabaseBrowser
        .from('popup_ads')
        .select('*')
        .eq('active', true)
        .contains('street_ids', [streetId]);

      if (error) {
        console.error('Error fetching popup ad:', error);
        return null;
      }

      if (!data || data.length === 0) {
        return null;
      }

      // Return a random ad from the matching ads
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex] as PopupAd;
    } catch (error) {
      console.error('Error in getAdForStreet:', error);
      return null;
    }
  },

  /**
   * Get all active popup ads
   */
  async getAllActiveAds(): Promise<PopupAd[]> {
    try {
      const { data, error } = await supabaseBrowser
        .from('popup_ads')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching popup ads:', error);
        return [];
      }

      return (data || []) as PopupAd[];
    } catch (error) {
      console.error('Error in getAllActiveAds:', error);
      return [];
    }
  },

  /**
   * Get a specific popup ad by ID
   */
  async getAdById(id: string): Promise<PopupAd | null> {
    try {
      const { data, error } = await supabaseBrowser
        .from('popup_ads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching popup ad:', error);
        return null;
      }

      return data as PopupAd;
    } catch (error) {
      console.error('Error in getAdById:', error);
      return null;
    }
  },
};
