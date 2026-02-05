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
    .select("nome, descricao, logo_url")
    .eq("id", negocioId)
    .maybeSingle();

  if (!negocio) {
    return {
      title: "Negócio não encontrado - Historin",
      description: "Este negócio não foi encontrado no Historin.",
    };
  }

  const title = `${negocio.nome} - Historin`;
  const description = negocio.descricao || `Conheça ${negocio.nome} no Historin - histórias e memórias locais.`;
  const imageUrl = negocio.logo_url || "https://historin.com.br/og-image.png";

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
