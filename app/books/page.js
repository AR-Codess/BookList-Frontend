"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");

  // ambil data dari backend
  const fetchBooks = async () => {
    try {
      const res = await api.get("books/");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  // simpan buku baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("books/postlist/", {
        title: string,
        author: string,
        published_date: published, 
      });
      console.log("Buku berhasil ditambahkan!");

      setTitle("");
      setAuthor("");
      setPublished("");

      fetchBooks(); // refresh
    } catch (err) {
      console.error("Error adding book:", err.response?.data || err.message);
      alert("Gagal menambahkan buku!");
    }
  };

//   Frontend
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",   
        justifyContent: "center", 
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>📚 Book List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p style={{ color: "#666" }}>Tidak ada buku</p>
      ) : (
        <ul style={{ padding: 0, marginBottom: "30px", width: "100%", maxWidth: "400px" }}>
          {books.map((book) => (
            <li
              key={book.id}
              style={{
                listStyle: "none",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f5f9ff",
              }}
            >
              <strong>{book.title}</strong> - {book.author} (
              {book.published_date})
            </li>
          ))}
        </ul>
      )}

      <h2 style={{ marginBottom: "10px", color: "#333" }}>➕ Tambah Buku</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          backgroundColor: "#e3f2fd",
        }}
      >
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000", 
          }}
        />
        <input
          type="text"
          placeholder="Penulis"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000", 
          }}
        />
        <input
          type="date"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            color: "#000", 
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
