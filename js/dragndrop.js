document.addEventListener("DOMContentLoaded", loadChampionList);

let dragitem;
let cname;
var jsonObject;

document.getElementById("resetbtn").addEventListener("click",  reset);

function loadChampionList()
{
    var request = new XMLHttpRequest();
        
    request.open("GET", "../data.json", true);
    request.responseType = "json";
    request.send();

    request.onload = function() {
        console.log(request.response);
        jsonObject = request.response;

        for (champ in jsonObject)
        {
            /* Create Div-Item for each Champion */
            let item = document.createElement("div");
            
            item.setAttribute("class", "item");
            item.setAttribute("id", champ);
            item.draggable = true;
            path = "../img/" + champ + ".png";
            item.style.backgroundImage = "url(" + path + ")";
            
            item.addEventListener("dragstart", dragStart);
            item.addEventListener("dragend", dragEnd);
            
            /* Add to document */
            grid = document.getElementById("champ-list-grid");
            grid.appendChild(item);
        }
    }
}

const empties = document.querySelectorAll(".empty");

for (const empty of empties)
{
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("drop", dragDrop);
}


function dragStart()
{
    cname = this.className;
    this.className += " hold";
    dragitem = this;
    setTimeout(() => (this.className = "invisible"), 0);
}

function dragEnd()
{
    this.className = cname;
    dragitem = null;
}

function dragOver(e)
{
    e.preventDefault();
}

function dragDrop()
{
    /* Dropable if target is empty or Champ List */
    if (this.id == "champ-list-grid" || (this.id != "champ-list-grid" && this.children.length < 1))
    {
        this.append(dragitem);
        
        /* Sort champ list */
        if (this == document.getElementById("champ-list-grid"))
        {
            update();
            setTimeout(() => {
                var divsToSort = document.getElementById("champ-list-grid").children;
                divsToSort = Array.prototype.slice.call(divsToSort, 0);
                divsToSort.sort(sortByID)
    
                document.getElementById("champ-list-grid").innerHTML = "";
                for (var i = 0, l = divsToSort.length; i < l; i++)
                {
                    document.getElementById("champ-list-grid").appendChild(divsToSort[i]);
                }
            }, 0)
        }
    }
}

function sortByID(a, b)
{
    var aobj = a.id.toLowerCase();
    var bobj = b.id.toLowerCase();
    if (aobj < bobj) { return -1 }
    if (aobj > bobj) { return 1 }
    return 0;
}

function reset() { 
    console.log("reset")
    location.reload(true); 
}