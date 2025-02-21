const ApiRick = "https://rickandmortyapi.com/api/character/"; 
        let paginaAtual = 1; 
        let maxPaginas = 826;  

        async function carregarDados() {
            try {
                const response = await fetch(`${ApiRick}?page=${paginaAtual}`);
                const data = await response.json();

                maxPaginas = data.info.pages; 

                console.log(data); 

                const container = document.getElementById("character-container");
                container.innerHTML = ""; 

                data.results.forEach(character => {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.innerHTML = `
                        <img src="${character.image}" alt="${character.name}">
                        <p>${character.name}</p>
                    `;
                    container.appendChild(card);
                });

            } catch (error) {
                console.error("Erro ao carregar personagens", error);
            }
        }

        function alterarPagina(delta) {
            paginaAtual += delta;

            
            if (paginaAtual < 1) paginaAtual = 1;
            if (paginaAtual > maxPaginas) paginaAtual = maxPaginas;

            carregarDados();
        }

        document.getElementById("anterior").addEventListener("click", () => alterarPagina(-1));
        document.getElementById("proximo").addEventListener("click", () => alterarPagina(1));

        document.addEventListener("DOMContentLoaded", carregarDados); 