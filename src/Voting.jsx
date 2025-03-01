import { useState, useEffect } from "react";

function Voting() {
    const [vote, setVote] = useState("");
    const [message, setMessage] = useState("");

    // Daftar pemain yang bisa dipilih
    const players = ["PLAYER A", "PLAYER B", "PLAYER C", "PLAYER D", "PLAYER E", "PLAYER F", "PLAYER G", "PLAYER H"];

    // Cek apakah hari ini Selasa, Rabu, atau Kamis
    const checkVotingDay = () => {
        const today = new Date().getDay(); // 0 = Minggu, 1 = Senin, 2 = Selasa, dst.
        return today >= 2 && today <= 4; // Selasa (2), Rabu (3), Kamis (4)
    };

    const handleVote = async () => {
        if (!checkVotingDay()) {
            setMessage("Voting hanya bisa dilakukan pada hari Selasa, Rabu, dan Kamis!");
            return;
        }

        if (!vote) {
            setMessage("Pilih pemain sebelum voting!");
            return;
        }

        const response = await fetch("https://pyramid-backend.onrender.com/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vote }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage(`Voting untuk ${vote} berhasil!`);
        } else {
            setMessage("Terjadi kesalahan, coba lagi.");
        }
    };

    return (
        <div className="container">
            <h1>Voting</h1>

            {/* Dropdown untuk memilih pemain */}
            <select value={vote} onChange={(e) => setVote(e.target.value)}>
                <option value="">Pilih Pemain</option>
                {players.map((player, index) => (
                    <option key={index} value={player}>{player}</option>
                ))}
            </select>

            <button onClick={handleVote}>Vote</button>
            {message && <p className="notif">{message}</p>}
        </div>
    );
}

export default Voting;
