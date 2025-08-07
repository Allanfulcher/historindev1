'use client'
import Link from 'next/link';

const ViewMap = () => {
    return (
    <div className="mb-4">
        <Link href="/">
          <button className="w-full p-4 rounded-lg bg-[#8A5A44] text-white font-semibold flex items-center justify-center hover:bg-[#5a3e2e] transition-colors duration-200">
            <i className="fas fa-map-marker-alt mr-2"></i> Ver Mapa
          </button>
        </Link>
      </div>
    )
}

export default ViewMap
