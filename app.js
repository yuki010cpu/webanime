// API URL
const API_URL = 'https://wajik-anime-api.vercel.app/samehadaku';

// Komponen Header
const Header = () => {
    return (
        <header className="bg-gray-800 shadow-lg sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-secondary flex items-center">
                        <i className="fas fa-play-circle mr-2 text-accent"></i>
                        AnimeStream
                    </div>
                </div>
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-secondary transition">Beranda</a>
                    <a href="#" className="hover:text-secondary transition">Terbaru</a>
                    <a href="#" className="hover:text-secondary transition">Populer</a>
                    <a href="#" className="hover:text-secondary transition">Genre</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Cari anime..." 
                            className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                        <button className="absolute right-2 top-2 text-gray-400 hover:text-white">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <button className="md:hidden">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

// Komponen Loading Spinner
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
        </div>
    );
};

// Komponen Error Message
const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="bg-red-900 bg-opacity-50 p-6 rounded-lg text-center max-w-md mx-auto mt-10">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Terjadi Kesalahan</h3>
            <p className="mb-4">{message}</p>
            <button 
                onClick={onRetry}
                className="bg-secondary hover:bg-primary px-4 py-2 rounded transition"
            >
                Coba Lagi
            </button>
        </div>
    );
};

// Komponen Anime Card
const AnimeCard = ({ anime, onClick }) => {
    // Format tanggal
    const formatDate = (dateString) => {
        if (!dateString) return 'Tidak diketahui';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Rating dengan bintang
    const renderRating = (rating) => {
        if (!rating) return null;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star text-yellow-400 text-xs"></i>
                ))}
                {hasHalfStar && <i className="fas fa-star-half-alt text-yellow-400 text-xs"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star text-yellow-400 text-xs"></i>
                ))}
                <span className="ml-1 text-xs">{rating}</span>
            </div>
        );
    };

    return (
        <div 
            className="anime-card bg-gray-800 rounded-lg overflow-hidden cursor-pointer h-full"
            onClick={() => onClick(anime)}
        >
            <div className="relative">
                <img 
                    src={anime.thumbnail || 'https://picsum.photos/seed/anime/300/400.jpg'} 
                    alt={anime.title || 'Anime'} 
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://picsum.photos/seed/fallback/300/400.jpg';
                    }}
                />
                {anime.episode && (
                    <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded text-xs font-bold">
                        Episode {anime.episode}
                    </div>
                )}
                {anime.status && (
                    <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                        {anime.status}
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-white mb-2 line-clamp-2">{anime.title || 'Tanpa Judul'}</h3>
                <div className="flex justify-between items-center mb-2">
                    {anime.uploadDate && (
                        <span className="text-xs text-gray-400">
                            <i className="far fa-calendar mr-1"></i>
                            {formatDate(anime.uploadDate)}
                        </span>
                    )}
                    {anime.rating && renderRating(anime.rating)}
                </div>
                {anime.genre && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {anime.genre.slice(0, 3).map((g, i) => (
                            <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                {g}
                            </span>
                        ))}
                        {anime.genre.length > 3 && (
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                                +{anime.genre.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Komponen Detail Anime
const AnimeDetail = ({ anime, onClose }) => {
    // Format tanggal
    const formatDate = (dateString) => {
        if (!dateString) return 'Tidak diketahui';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Rating dengan bintang
    const renderRating = (rating) => {
        if (!rating) return null;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star text-yellow-400"></i>
                ))}
                {hasHalfStar && <i className="fas fa-star-half-alt text-yellow-400"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>
                ))}
                <span className="ml-2">{rating}/5.0</span>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 detail-overlay bg-black bg-opacity-75">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto fade-in">
                <div className="relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 z-10"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <img 
                                src={anime.thumbnail || 'https://picsum.photos/seed/anime/300/400.jpg'} 
                                alt={anime.title || 'Anime'} 
                                className="w-full h-full object-cover md:rounded-l-lg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://picsum.photos/seed/fallback/300/400.jpg';
                                }}
                            />
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                            <h1 className="text-2xl font-bold mb-4">{anime.title || 'Tanpa Judul'}</h1>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {anime.status && (
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                        {anime.status}
                                    </span>
                                )}
                                {anime.episode && (
                                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                                        Episode {anime.episode}
                                    </span>
                                )}
                                {anime.uploadDate && (
                                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                                        <i className="far fa-calendar mr-1"></i>
                                        {formatDate(anime.uploadDate)}
                                    </span>
                                )}
                            </div>
                            
                            {anime.rating && (
                                <div className="mb-4">
                                    {renderRating(anime.rating)}
                                </div>
                            )}
                            
                            {anime.genre && (
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold mb-2">Genre</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {anime.genre.map((g, i) => (
                                            <span key={i} className="bg-gray-700 px-3 py-1 rounded text-sm">
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {anime.sinopsis && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
                                    <p className="text-gray-300">{anime.sinopsis}</p>
                                </div>
                            )}
                            
                            <div className="flex gap-3">
                                <button className="bg-secondary hover:bg-primary text-white px-6 py-2 rounded-lg transition flex items-center">
                                    <i className="fas fa-play mr-2"></i>
                                    Tonton Sekarang
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition flex items-center">
                                    <i className="fas fa-plus mr-2"></i>
                                    Tambah ke Daftar
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
                                    <i className="fas fa-share-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Komponen Sidebar Filter
const Sidebar = ({ genres, statuses, onFilterChange, activeFilters }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 h-fit sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Filter</h3>
            
            <div className="mb-6">
                <h4 className="font-medium mb-2">Genre</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {genres.map((genre, i) => (
                        <label key={i} className="flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={activeFilters.genres.includes(genre)}
                                onChange={() => onFilterChange('genres', genre)}
                            />
                            <span className="text-sm">{genre}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            <div className="mb-6">
                <h4 className="font-medium mb-2">Status</h4>
                <div className="space-y-2">
                    {statuses.map((status, i) => (
                        <label key={i} className="flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="mr-2"
                                checked={activeFilters.statuses.includes(status)}
                                onChange={() => onFilterChange('statuses', status)}
                            />
                            <span className="text-sm">{status}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            <button 
                className="w-full bg-secondary hover:bg-primary text-white py-2 rounded transition"
                onClick={() => onFilterChange('reset')}
            >
                Reset Filter
            </button>
        </div>
    );
};

// Komponen Footer
const Footer = () => {
    return (
        <footer className="bg-gray-800 mt-12 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-2xl font-bold text-secondary flex items-center mb-4">
                            <i className="fas fa-play-circle mr-2 text-accent"></i>
                            AnimeStream
                        </div>
                        <p className="text-gray-400 text-sm">
                            Platform streaming anime terlengkap dengan kualitas terbaik.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Menu</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">Beranda</a></li>
                            <li><a href="#" className="hover:text-white transition">Terbaru</a></li>
                            <li><a href="#" className="hover:text-white transition">Populer</a></li>
                            <li><a href="#" className="hover:text-white transition">Genre</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Bantuan</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition">Kontak</a></li>
                            <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold mb-4">Ikuti Kami</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
                    <p>&copy; 2023 AnimeStream. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
};

// Komponen Utama App
const App = () => {
    // State untuk data anime
    const [animeList, setAnimeList] = React.useState([]);
    const [filteredAnimeList, setFilteredAnimeList] = React.useState([]);
    const [selectedAnime, setSelectedAnime] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [genres, setGenres] = React.useState([]);
    const [statuses, setStatuses] = React.useState([]);
    const [activeFilters, setActiveFilters] = React.useState({
        genres: [],
        statuses: []
    });
    const [searchTerm, setSearchTerm] = React.useState('');

    // Fetch data dari API
    const fetchAnimeData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(API_URL);
            
            if (response.data && response.data.data) {
                const animeData = response.data.data;
                setAnimeList(animeData);
                setFilteredAnimeList(animeData);
                
                // Ekstrak semua genre unik
                const allGenres = new Set();
                const allStatuses = new Set();
                
                animeData.forEach(anime => {
                    if (anime.genre && Array.isArray(anime.genre)) {
                        anime.genre.forEach(g => allGenres.add(g));
                    }
                    if (anime.status) {
                        allStatuses.add(anime.status);
                    }
                });
                
                setGenres(Array.from(allGenres));
                setStatuses(Array.from(allStatuses));
            } else {
                throw new Error('Format data tidak valid');
            }
        } catch (err) {
            console.error('Error fetching anime data:', err);
            setError('Gagal memuat data anime. Silakan coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    // Filter anime berdasarkan filter aktif
    React.useEffect(() => {
        let filtered = [...animeList];
        
        // Filter berdasarkan genre
        if (activeFilters.genres.length > 0) {
            filtered = filtered.filter(anime => {
                if (!anime.genre || !Array.isArray(anime.genre)) return false;
                return activeFilters.genres.some(g => anime.genre.includes(g));
            });
        }
        
        // Filter berdasarkan status
        if (activeFilters.statuses.length > 0) {
            filtered = filtered.filter(anime => 
                activeFilters.statuses.includes(anime.status)
            );
        }
        
        // Filter berdasarkan pencarian
        if (searchTerm) {
            filtered = filtered.filter(anime => 
                anime.title && anime.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredAnimeList(filtered);
    }, [animeList, activeFilters, searchTerm]);

    // Handle perubahan filter
    const handleFilterChange = (filterType, value) => {
        if (filterType === 'reset') {
            setActiveFilters({
                genres: [],
                statuses: []
            });
            return;
        }
        
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            const filterArray = [...newFilters[filterType]];
            
            const index = filterArray.indexOf(value);
            if (index > -1) {
                filterArray.splice(index, 1);
            } else {
                filterArray.push(value);
            }
            
            newFilters[filterType] = filterArray;
            return newFilters;
        });
    };

    // Handle pencarian
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Fetch data saat komponen dimuat
    React.useEffect(() => {
        fetchAnimeData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="md:w-64 flex-shrink-0">
                        <Sidebar 
                            genres={genres}
                            statuses={statuses}
                            onFilterChange={handleFilterChange}
                            activeFilters={activeFilters}
                        />
                    </aside>
                    
                    {/* Konten Utama */}
                    <div className="flex-grow">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Daftar Anime</h2>
                            <div className="text-sm text-gray-400">
                                Menampilkan {filteredAnimeList.length} dari {animeList.length} anime
                            </div>
                        </div>
                        
                        {loading ? (
                            <LoadingSpinner />
                        ) : error ? (
                            <ErrorMessage message={error} onRetry={fetchAnimeData} />
                        ) : filteredAnimeList.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredAnimeList.map((anime, index) => (
                                    <AnimeCard 
                                        key={index} 
                                        anime={anime} 
                                        onClick={setSelectedAnime}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
                                <h3 className="text-xl font-semibold mb-2">Tidak Ada Anime Ditemukan</h3>
                                <p className="text-gray-400">Coba ubah filter atau kata kunci pencarian</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            <Footer />
            
            {/* Modal Detail Anime */}
            {selectedAnime && (
                <AnimeDetail 
                    anime={selectedAnime} 
                    onClose={() => setSelectedAnime(null)} 
                />
            )}
            
            {/* Override pencarian di header */}
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    const searchInput = document.querySelector('input[type="text"]');
                    if (searchInput) {
                        searchInput.addEventListener('input', function(e) {
                            // This would need to be connected to React state in a real implementation
                            console.log('Search term:', e.target.value);
                        });
                    }
                });
            </script>
        </div>
    );
};

// Render aplikasi ke DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
