import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Play,
    ArrowLeft,
    Heart,
    Star,
    Share2,
} from "lucide-react";

interface Video {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    artist: string;
    liked: boolean;
    favorite: boolean;
}

const API = "http://localhost:8080/api/videos";

function extractEmbed(url: string): string {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
}

const VideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [video, setVideo] = useState<Video | null>(null);
    const [allVideos, setAllVideos] = useState<Video[]>([]);

    // Cargar video actual y lista completa
    useEffect(() => {
        fetch(`${API}/${id}`)
            .then((res) => res.json())
            .then(setVideo)
            .catch(console.error);

        fetch(API)
            .then((res) => res.json())
            .then(setAllVideos)
            .catch(console.error);
    }, [id]);

    if (!video) return <div className="text-center p-10">Loading...</div>;

    const embedUrl = `https://www.youtube.com/embed/${extractEmbed(video.url)}`;

    // ------------------------------
    // ACCIONES: Like / Favorite
    // ------------------------------
    const toggleLike = async () => {
        const updated = { ...video, liked: !video.liked };

        await fetch(`${API}/${video.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setVideo(updated);

        // refrescar lista para Up Next
        setAllVideos((prev) =>
            prev.map((v) => (v.id === updated.id ? updated : v))
        );
    };

    const toggleFavorite = async () => {
        const updated = { ...video, favorite: !video.favorite };

        await fetch(`${API}/${video.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setVideo(updated);

        setAllVideos((prev) =>
            prev.map((v) => (v.id === updated.id ? updated : v))
        );
    };

    // ------------------------------
    // SHARE (copiar URL)
    // ------------------------------
    const shareVideo = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("🔗 Copied link to clipboard!");
    };

    // ------------------------------
    // UP NEXT ordenado por favoritos
    // ------------------------------
    const upNext = allVideos
        .filter((v) => v.id !== video.id)
        .sort((a, b) => {
            if (a.favorite && !b.favorite) return -1;
            if (!a.favorite && b.favorite) return 1;
            return a.title.localeCompare(b.title);
        });

    return (
        <div className="min-h-screen bg-background px-6 py-8">
            {/* HEADER */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm mb-6">
                <div className="container mx-auto px-6 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    <div>
                        <Link
                            to="/playlist"
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            Home / My Playlist /
                        </Link>
                        <span className="ml-1 font-medium">{video.title}</span>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-[1fr,350px] gap-8 container mx-auto">

                {/* MAIN VIDEO */}
                <div>
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden card-shadow">
                        <iframe
                            className="w-full h-full"
                            src={embedUrl}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <h1 className="text-3xl font-bold mt-6">{video.title}</h1>
                    <p className="text-muted-foreground mb-4">By {video.artist}</p>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3 mt-4">
                        {/* LIKE */}
                        <Button
                            variant="outline"
                            onClick={toggleLike}
                            className={`h-11 px-6 ${
                                video.liked ? "bg-red-500/10 border-red-500 text-red-500" : ""
                            }`}
                        >
                            <Heart
                                className={`w-5 h-5 mr-2 ${
                                    video.liked ? "fill-current" : ""
                                }`}
                            />
                            Like
                        </Button>

                        {/* FAVORITE */}
                        <Button
                            variant="outline"
                            onClick={toggleFavorite}
                            className={`h-11 px-6 ${
                                video.favorite
                                    ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                                    : ""
                            }`}
                        >
                            <Star
                                className={`w-5 h-5 mr-2 ${
                                    video.favorite ? "fill-current" : ""
                                }`}
                            />
                            Favorite
                        </Button>

                        {/* SHARE */}
                        <Button variant="outline" onClick={shareVideo} className="h-11 px-6">
                            <Share2 className="w-5 h-5 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* UP NEXT */}
                <div>
                    <div className="bg-card p-4 rounded-lg border border-border card-shadow sticky top-6">
                        <h3 className="font-bold text-lg mb-4">Up Next</h3>

                        {upNext.length === 0 && (
                            <p className="text-muted-foreground">No more videos.</p>
                        )}

                        <div className="space-y-3">
                            {upNext.map((v) => (
                                <Link
                                    key={v.id}
                                    to={`/video/${v.id}`}
                                    className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                                >
                                    <img
                                        src={v.thumbnail}
                                        alt={v.title}
                                        className="w-32 h-20 object-cover rounded"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm line-clamp-2">{v.title}</h4>
                                        <p className="text-xs text-muted-foreground">{v.artist}</p>

                                        {v.favorite && (
                                            <span className="text-yellow-500 text-xs font-medium">
                        ★ Favorite
                      </span>
                                        )}
                                    </div>

                                    <Play className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default VideoPage;
