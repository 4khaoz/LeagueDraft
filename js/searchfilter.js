var input = document.getElementById("searchbar");

input.addEventListener("keyup", search);

function search() {
    filter = input.value.toLowerCase();
    grid = document.getElementById("champ-list-grid");
    champs = document.querySelectorAll(".item");
    
    for (i = 0; i < champs.length; i++)
    {
        if (champs[i].id.toLowerCase().indexOf(filter) > -1)
        {
            champs[i].style.display = "";
        }
        else
        {
            if (champs[i].parentElement == grid)
            {
                champs[i].style.display = "none";
            }
        }
    }
}