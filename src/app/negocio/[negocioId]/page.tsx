import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import NegocioPageClient from "./NegocioPageClient";

// Create a simple Supabase client for server-side metadata fetching
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(supabaseUrl, supabaseKey);
}

interface PageProps {
  params: Promise<{ negocioId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { negocioId } = await params;
  
  const supabase = getSupabaseClient();
  
  const { data: negocio } = await supabase
    .from("businesses")
    .select("nome, descricao")
    .eq("id", negocioId)
    .maybeSingle();

  if (!negocio) {
    return {
      title: "Negócio não encontrado - Historin",
      description: "Este negócio não foi encontrado no Historin.",
    };
  }

  // Fetch first story image for the embed
  const { data: stories } = await supabase
    .from("stories")
    .select("fotos")
    .or(`org_id.eq.${negocioId},negocio_id.eq.${negocioId}`)
    .limit(1);

  // Get the first photo from the first story
  let imageUrl = "https://historin.com.br/og-image.png";
  if (stories && stories.length > 0 && stories[0].fotos) {
    const fotos = stories[0].fotos;
    if (Array.isArray(fotos) && fotos.length > 0) {
      // Handle both string array and object array with url property
      const firstPhoto = fotos[0];
      imageUrl = typeof firstPhoto === "string" ? firstPhoto : firstPhoto?.url || imageUrl;
    }
  }

  const title = `${negocio.nome} - Historin`;
  const description = negocio.descricao || `Conheça ${negocio.nome} no Historin - histórias e memórias locais.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: negocio.nome,
        },
      ],
      type: "website",
      siteName: "Historin",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function NegocioPage({ params }: PageProps) {
  const { negocioId } = await params;
  return <NegocioPageClient negocioId={negocioId} />;
}
