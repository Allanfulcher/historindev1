'use client'
import Link from 'next/link';

const ViewMap = () => {
    return (
    <div className="mb-4">
        <Link href="/">
          <button className="w-full p-4 rounded-lg bg-[#8B4513] text-white font-semibold flex items-center justify-center hover:bg-[#A0522D] transition-colors duration-200">
            <i className="fas fa-map-marker-alt mr-2"></i> Ver Mapa
          </button>
        </Link>
      </div>
    )
}

export default ViewMap
