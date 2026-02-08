import { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

function AdminPage() {
    const [photos, setPhotos] = useState([]);
    const [newPhoto, setNewPhoto] = useState({ url: '', category: 'Wedding', title: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch photos on load
    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/media`);
            if (!response.ok) {
                // If backend is missing (e.g. GitHub Pages), just show empty or handle gracefully
                console.warn("Backend not available");
                return;
            }
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error('Error fetching photos:', error);
            setError("Backend not connected. Admin features are disabled on static hosting.");
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/media`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPhoto),
            });

            if (response.ok) {
                setNewPhoto({ url: '', category: 'Wedding', title: '' });
                fetchPhotos(); // Refresh list
            } else {
                alert("Failed to upload. Backend may be offline or read-only.");
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert("Error uploading photo. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/media/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchPhotos();
            } else {
                alert("Failed to delete. Backend might be read-only.");
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    return (
        <section className="section bg-off-white" style={{ minHeight: '80vh', paddingTop: '100px' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="text-center" style={{ marginBottom: '3rem' }}>
                    <h2>Admin Panel</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your portfolio photos here.</p>
                    {error && (
                        <div style={{
                            padding: '1rem',
                            background: '#ffebee',
                            color: '#c62828',
                            marginTop: '1rem',
                            borderRadius: '4px',
                            border: '1px solid #ffcdd2'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* Upload Form */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '3rem' }}>
                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={20} /> Add New Photo</h4>
                    <form onSubmit={handleUpload} style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 2fr) minmax(150px, 1fr) minmax(150px, 1fr) auto', gap: '1rem', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Image URL</label>
                            <input
                                type="url"
                                value={newPhoto.url}
                                onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                                placeholder="https://example.com/photo.jpg"
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-medium)', borderRadius: '4px' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Category</label>
                            <select
                                value={newPhoto.category}
                                onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-medium)', borderRadius: '4px' }}
                            >
                                {['Wedding', 'Baby Shoot', 'Bride Shoot', 'Indoor', 'Outdoor', 'Kids'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Title (Optional)</label>
                            <input
                                type="text"
                                value={newPhoto.title}
                                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                                placeholder="Photo Title"
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid var(--border-medium)', borderRadius: '4px' }}
                            />
                        </div>
                        <button disabled={loading} className="btn btn-primary" style={{ height: '46px' }}>
                            {loading ? 'Adding...' : 'Add Photo'}
                        </button>
                    </form>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                        Tip: You can use free image hosting sites like Imgur or Unsplash URLs.
                    </p>
                </div>

                {/* Photo List */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ImageIcon size={20} /> Current Photos</h4>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {photos.map(photo => (
                            <div key={photo.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                                <img src={photo.url} alt={photo.category} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div style={{ flex: 1 }}>
                                    <h5 style={{ margin: 0 }}>{photo.category}</h5>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{photo.url}</p>
                                </div>
                                <button onClick={() => handleDelete(photo.id)} style={{ background: 'none', border: 'none', color: '#c94c4c', cursor: 'pointer', padding: '0.5rem' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        {photos.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No photos added yet (or backend offline).</p>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminPage;
