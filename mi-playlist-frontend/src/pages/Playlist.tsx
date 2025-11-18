import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Play,
    Search,
    Heart,
    Star,
    Trash2,
    Plus,
    User,
    LogOut,
    Settings,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Video {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    artist: string;
    liked: boolean;
    favorite: boolean;
}

const API = "http://localhost:8085/api/videos";

const Playlist = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [newVideoTitle, setNewVideoTitle] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [videos, setVideos] = useState<Video[]>([]);


    //Cargar videos al inicio
    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => setVideos(data))
            .catch((err) => console.error(err));
    }, []);


    //Toggle Like
    const toggleLike = async (id: string) => {
        const video = videos.find((v) => v.id === id);
        if (!video) return;

        const updated = { ...video, liked: !video.liked };

        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setVideos(videos.map((v) => (v.id === id ? updated : v)));
    };


    //Toggle Favorite
    const toggleFavorite = async (id: string) => {
        const video = videos.find((v) => v.id === id);
        if (!video) return;

        const updated = { ...video, favorite: !video.favorite };

        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setVideos(videos.map((v) => (v.id === id ? updated : v)));
    };


    //Delete Video
    const deleteVideo = async (id: string) => {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        setVideos(videos.filter((v) => v.id !== id));
    };


    //Add New Video
    const addVideo = () => {
        fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newVideoTitle,
                url: newVideoUrl,
            }),
        })
            .then((res) => res.json())
            .then((video) => {
                setVideos([video, ...videos]);
                setNewVideoTitle("");
                setNewVideoUrl("");
            });
    };


    //Search Filter
    const filteredVideos = videos.filter((v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* HEADER */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                            <Play className="w-5 h-5 fill-white" />
                        </div>
                        <h1 className="text-2xl font-bold">MiPlaylist</h1>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link to="/settings">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Configuración
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                                <Link to="/login" className="text-destructive">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Cerrar Sesión
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-[1fr,400px] gap-8">
                    {/* LISTA DE VIDEOS */}
                    <div>
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-2">Music Videos 🎬</h2>
                            <p className="text-muted-foreground">
                                Your favorite music video collection
                            </p>
                        </div>

                        {/* Buscador */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Filter videos by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-card border-border h-12"
                            />
                        </div>

                        {/* Items */}
                        <div className="space-y-3">
                            {filteredVideos.length > 0 ? (
                                filteredVideos.map((video) => (
                                    <Link
                                        key={video.id}
                                        to={`/video/${video.id}`}
                                        className="block bg-card hover:bg-card/80 rounded-lg p-4 transition-all card-shadow border border-border/50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-24 h-16 object-cover rounded"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-lg truncate">
                                                    {video.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {video.artist}
                                                </p>
                                            </div>

                                            {/* Botones Like / Fav / Delete */}
                                            <div
                                                className="flex items-center gap-2"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <button
                                                    onClick={() => toggleLike(video.id)}
                                                    className={`p-2 rounded-full hover:bg-muted transition-colors ${
                                                        video.liked
                                                            ? "text-red-500"
                                                            : "text-muted-foreground"
                                                    }`}
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 ${
                                                            video.liked ? "fill-current" : ""
                                                        }`}
                                                    />
                                                </button>

                                                <button
                                                    onClick={() => toggleFavorite(video.id)}
                                                    className={`p-2 rounded-full hover:bg-muted transition-colors ${
                                                        video.favorite
                                                            ? "text-yellow-500"
                                                            : "text-muted-foreground"
                                                    }`}
                                                >
                                                    <Star
                                                        className={`w-5 h-5 ${
                                                            video.favorite ? "fill-current" : ""
                                                        }`}
                                                    />
                                                </button>

                                                <button
                                                    onClick={() => deleteVideo(video.id)}
                                                    className="p-2 rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                        <Play className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Your playlist is empty!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Add your first videos using the form to get started.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SIDEBAR: Add Video */}
                    <div>
                        <div className="bg-card rounded-lg p-6 border border-border card-shadow sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Add New Video</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Title</label>
                                    <Input
                                        placeholder="Enter video title"
                                        value={newVideoTitle}
                                        onChange={(e) => setNewVideoTitle(e.target.value)}
                                        className="bg-input border-border"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Link (URL)
                                    </label>
                                    <Input
                                        placeholder="https://youtube.com/watch?v=..."
                                        value={newVideoUrl}
                                        onChange={(e) => setNewVideoUrl(e.target.value)}
                                        className="bg-input border-border"
                                    />
                                </div>

                                <Button
                                    onClick={addVideo}
                                    className="w-full gradient-primary text-white font-semibold h-12 hover:opacity-90"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add to Playlist
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playlist;
