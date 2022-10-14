import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email?: any;
}

export interface Sponsor {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location?: any;
  links: Links2;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: Sponsor;
}

export interface BusinessWork {
  status: string;
  approved_on: Date;
}

export interface StreetPhotography {
  status: string;
}

export interface Architecture {
  status: string;
}

export interface TexturesPatterns {
  status: string;
}

export interface Wallpapers {
  status: string;
}

export interface Interiors {
  status: string;
}

export interface TopicSubmissions {
  businessWork: BusinessWork;
  streetPhotography: StreetPhotography;
  architecture: Architecture;
  texturesPatterns: TexturesPatterns;
  wallpapers: Wallpapers;
  interiors: Interiors;
}

export interface Links3 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage2 {
  small: string;
  medium: string;
  large: string;
}

export interface Social2 {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email?: any;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: Links3;
  profile_image: ProfileImage2;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social2;
}

export interface IPhoto {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at?: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: any;
  alt_description?: any;
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Sponsorship;
  topic_submissions: TopicSubmissions;
  user: User;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
