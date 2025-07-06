import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  ExternalLink,
  Copy,
  Trash2,
  LogOut,
  User,
  Link as LinkIcon,
  Plus,
  Search,
  Calendar,
  BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";
import { urlAPI } from "../services/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shortening, setShortening] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await urlAPI.getUrlList();
      // console.log("response", response.data);
      if (response.data.code === 200) {
        setUrls(response.data.data);
        // Calculate stats after URLs are loaded
        calculateStats(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (urlList) => {
    setStats({
      total: urlList.length,
      today: urlList.filter((url) => {
        const today = new Date().toDateString();
        const urlDate = new Date(url.createdAt).toDateString();
        return urlDate === today;
      }).length,
      thisWeek: urlList.filter((url) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(url.createdAt) > weekAgo;
      }).length,
    });
  };

  console.log("urls", urls);
  console.log("stats", stats);

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setShortening(true);
      const response = await urlAPI.shortenUrl(longUrl);

      if (response.data.code === 200) {
        toast.success("URL shortened successfully!");
        setLongUrl("");
        fetchUrls();
      } else {
        toast.error(response.data.message || "Failed to shorten URL");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to shorten URL");
    } finally {
      setShortening(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const deleteUrl = async (urlId) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      await urlAPI.deleteUrl(urlId);
      toast.success("URL deleted successfully!");
      fetchUrls();
    } catch (error) {
      toast.error("Failed to delete URL");
    }
  };

  const filteredUrls = urls.filter(
    (url) =>
      url.org_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.short_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                URL Shortener
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium">{user?.full_name || "User"}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <LinkIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total URLs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.today}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.thisWeek}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* URL Shortener Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Shorten a URL
          </h2>
          <form onSubmit={handleShortenUrl} className="flex space-x-4">
            <div className="flex-1">
              <input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={shortening}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              {shortening ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>Shorten</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* URL List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Your URLs</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search URLs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading URLs...</p>
              </div>
            ) : filteredUrls.length === 0 ? (
              <div className="p-8 text-center">
                <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No URLs found. Start by shortening your first URL!
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUrls.map((url) => (
                    <tr key={url._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate">
                          <a
                            href={url.org_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            {url.org_url}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <a
                            href={url.shortened_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                          >
                            {url.shortened_url}
                          </a>
                          <button
                            onClick={() => copyToClipboard(url.shortened_url)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {url.clicks}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteUrl(url._id)}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
