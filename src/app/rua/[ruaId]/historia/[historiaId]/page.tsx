import React from 'react';
import type { Metadata } from 'next';
import RuaHistoria from '../../../../../components/ruas/RuaHistoria';
import { supabaseBrowser } from '@/lib/supabase/client';

type Props = {
  params: Promise<{ ruaId: string; historiaId: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { ruaId, historiaId } = await params;
  
  // Fetch historia from Supabase
  const { data: historia } = await supabaseBrowser
    .from('stories')
    .select('id, rua_id, titulo, descricao, fotos')
    .eq('id', historiaId)
    .single();

  // Fetch rua from Supabase
  const targetRuaId = ruaId || historia?.rua_id;
  const { data: rua } = targetRuaId
    ? await supabaseBrowser
        .from('streets')
        .select('id, nome')
        .eq('id', targetRuaId)
        .single()
    : { data: null };

  const title = historia?.titulo
    ? `${historia.titulo}`
    : 'História';

  const description = historia?.descricao
    ? historia.descricao.slice(0, 160)
    : 'História das ruas de Gramado e Canela no Historin.';

  // Try to extract a cover image
  let imageUrl: string | undefined;
  const fotos = historia?.fotos as any;
  if (Array.isArray(fotos) && fotos.length > 0) {
    const first = fotos[0];
    imageUrl = typeof first === 'string' ? first : first?.url;
  }

  // Normalize to absolute/relative path handled by metadataBase
  const images = imageUrl
    ? [{ url: imageUrl, alt: title }]
    : [{ url: '/images/meta/criadores.webp', alt: 'Historin - Histórias de Gramado e Canela' }];

  const canonical = `/rua/${ruaId}/historia/${historiaId}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      siteName: 'Historin',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    keywords: rua?.nome ? [rua.nome, 'Gramado', 'História', 'Rua'] : ['Gramado', 'História', 'Rua'],
  };
}

export default function RuaHistoriaPage() {
  // Don't pass scrollToHistoriaId from URL - only trigger auto-scroll via explicit navigation
  return <RuaHistoria />;
}
