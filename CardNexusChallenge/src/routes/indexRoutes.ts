import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
  res.send(`
    <html>
    <head><title>Card Search Test</title></head>
    <body>
        <h1>Search Cards</h1>
        <form id="searchForm">
        <label>Game:
        <select name="game">
            <option value="">Any</option>
            <option value="MTG">MTG</option>
            <option value="Lorcana">Lorcana</option>
        </select>
        </label><br />

        <label>Name: <input type="text" name="name" /></label><br />

        <label>Rarity:
            <select name="rarity" id="rarity-select" multiple></select>
            <script>
                async function loadRarities()
                {
                    const res = await fetch('/rarities');
                    const data = await res.json();

                    const select = document.getElementById('rarity-select');
                    select.innerHTML = ''; // clear previous

                    data.forEach(r =>
                    {
                        const option = document.createElement('option');
                        option.value = r.name;
                        option.textContent = r.name +' (' + r.game+')';
                        select.appendChild(option);
                    });
                }

                loadRarities();
            </script>
        </label><br />

        <label>Color:
          <select name="color" multiple>
            <option value="W">White (W)</option>
            <option value="U">Blue (U)</option>
            <option value="B">Black (B)</option>
            <option value="R">Red (R)</option>
            <option value="G">Green (G)</option>
            <option value="null">No Color</option>
          </select>
        </label><br />

        <label>Ink Cost Min: <input type="number" name="ink_cost_min"/></label><br />
        <label>Ink Cost Max: <input type="number" name="ink_cost_max"/></label><br />

        <label>Limit: <input type="number" name="limit"/></label><br />

        <button type="submit">Search</button>
        </form>

        <h2>Results</h2>
        <pre id="results">Submit the form to see results.</pre>

        <script>
            document.getElementById('searchForm').addEventListener('submit', async function (e) {
                e.preventDefault();

                const form = e.target;
                const rawData = new FormData(form);
                const cleanParams = new URLSearchParams();

                for (const [key, value] of rawData.entries()) {
                if (value !== '' && value !== null) {
                    cleanParams.append(key, value.toString());
                }
                }

                const res = await fetch('/cards?' + cleanParams.toString());
                const data = await res.json();

                document.getElementById('results').textContent = JSON.stringify(data, null, 2);
            });
        </script>

    </body>
    </html>
  `);
});

export default router;
