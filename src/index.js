import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector(".articles-container");
const date = (document.getElementById("Aujourdhui").valueAsDate =
  new Date()).toString();
const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
<img
  src="${article.img}"
  alt="profile"
/>
<h2>${article.title}</h2>
<p class="article-author">${article.author} - ${new Date(
      article.createdAt
    ).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}</p>
<p class="article-content">
  ${article.content}
</p>
<div class="article-actions">
  <button class="btn btn-danger" data-id=${article._id} >Supprimer</button>
<button class="btn btn-primary" data-id=${article._id} >Editer</button>

</div>
`;
    return articleDOM;
  });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articleContainerElement.querySelectorAll(".btn-primary");
  editButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${articleId}`);
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = fetch(`https://restapi.fr/api/articles/${articleId}`, {
          method: "DELETE",
        });
        const body = (await response).json;
        console.log(body);
        fetchArticle();
      } catch (error) {
        console.log(error);
      }
    });
  });
};



const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/articles");
    let articles = await response.json();
    // Restapi retourne un objet s'il n'y a qu'un seul article
    // nous devons donc le transformer en tableau :
    if (!Array.isArray(articles)) {
      articles = [articles];
    }
    createArticles(articles);
  } catch (e) {
    console.log("e : ", e);
  }
};

fetchArticle();
