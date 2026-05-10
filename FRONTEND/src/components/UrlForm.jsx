import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BACKEND_CREATE_URL = "http://localhost:3000/api/create";

const UrlForm = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUrl) =>
      axios.post(BACKEND_CREATE_URL, { url: newUrl }).then((res) => res.data),
    onSuccess: (data) => {
      setShortUrl(data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setInputUrl("");
    },
    onError: (err) => {
      console.error(err);
      setError("Could not create short URL. Is the backend running?");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    if (!inputUrl) {
      setError("Please enter a URL");
      return;
    }
    mutation.mutate(inputUrl);
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied to clipboard");
    } catch (err) {
      console.error(err);
      setError("Copy failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter URL
          </label>
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {mutation.isLoading ? "Creating…" : "Create Short URL"}
          </button>
          <button
            type="button"
            onClick={() => {
              setInputUrl("");
              setShortUrl("");
              setError("");
            }}
            className="px-3 py-2 border rounded"
          >
            Clear
          </button>
        </div>
      </form>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      {shortUrl && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <div className="mb-2 text-sm text-gray-600">Short URL</div>
          <div className="flex items-center justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 break-all"
            >
              {shortUrl}
            </a>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
