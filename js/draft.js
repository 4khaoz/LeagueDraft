document.addEventListener("DOMContentLoaded", setup)

const Traits = [
    "domination",
    "destruction",
    "engage",
    "disengage",
    "duelist",
    "tank",
    "punisher",
    "joker",
    "guardian",
    "slayer",
    "global",
    "crowdcontrol",
    "mobility",
]

function setup()
{
    console.log("setting up");

    /* Request data from JSON-File at store in jsonObject */
    var request = new XMLHttpRequest(); 
    request.open("GET", "..\\data.json", true);
    request.responseType = "json";
    request.send();

    request.onload = function() {
        console.log(request.response);
        jsonObject = request.response;
    }

    setEventListener();

    setPropsParagraphs();

    setChampSelector();

    /* Set Ban-Traits as Default */ 
    document.getElementById("BanLink").setAttribute("class", "tablinks active");
    document.getElementById("TabBans").style.display = "block";
}

function setPropsParagraphs()
{
    var bandiv = document.getElementById("bansprop");
    var pickdiv = document.getElementById("picksprop");

    /* Create Paragraph for each Trait in Bandiv */
    for (const trait of Traits)
    {
        var bp = document.createElement("p");
        bp.setAttribute("class", "traitp");
        bp.innerHTML = trait;
        bandiv.appendChild(bp);

        var bluebantrait = document.createElement("p");
        bluebantrait.setAttribute("class", "traitp bluep");
        bluebantrait.setAttribute("id", "blueban"+trait);
        bluebantrait.innerHTML = 0;

        var redbantrait = document.createElement("p");
        redbantrait.setAttribute("class", "traitp redp");
        redbantrait.setAttribute("id", "redban"+trait);
        redbantrait.innerHTML = 0;

        console.log(document.URL.indexOf("html/reddraft.html"))
        if (document.URL.indexOf("reddraft.html") == -1)
        {
            bandiv.appendChild(bluebantrait);
            bandiv.appendChild(redbantrait);
        }
        else
        {
            bandiv.appendChild(redbantrait);
            bandiv.appendChild(bluebantrait);
        }
    }

    /* Create Paragraphs for each Trait in Pickdiv */
    for (const trait of Traits)
    {
        var pp = document.createElement("p");
        pp.setAttribute("class", "traitp");
        pp.innerHTML = trait;
        pickdiv.appendChild(pp);
        
        var bluepicktrait = document.createElement("p");
        bluepicktrait.setAttribute("class", "traitp bluep");
        bluepicktrait.setAttribute("id", "bluepick"+trait);
        bluepicktrait.innerHTML = 0;
        
        var redpicktrait = document.createElement("p");
        redpicktrait.setAttribute("class", "traitp redp");
        redpicktrait.setAttribute("id", "redpick"+trait);
        redpicktrait.innerHTML = 0;

        console.log(document.URL.indexOf("html/reddraft.html"))
        if (document.URL.indexOf("reddraft.html") == -1)
        {
            pickdiv.appendChild(bluepicktrait);
            pickdiv.appendChild(redpicktrait);
        }
        else
        {
            pickdiv.appendChild(redpicktrait);
            pickdiv.appendChild(bluepicktrait);
        }
    }
}

function setEventListener()
{
    document.getElementById("BanLink").addEventListener("click", function() {openTab(event, "TabBans")});
    document.getElementById("PickLink").addEventListener("click", function() {openTab(event, "TabPicks")});

    setTimeout(() => {
        bluebans = document.querySelectorAll(".b-ban");
        redbans = document.querySelectorAll(".r-ban");
        bluepicks = document.querySelectorAll(".b-pick");
        redpicks = document.querySelectorAll(".r-pick");
    
        for (i = 0; i < 5; i++)
        {
            bluebans[i].addEventListener("drop", update);
            redbans[i].addEventListener("drop", update);
            bluepicks[i].addEventListener("drop", update);
            redpicks[i].addEventListener("drop", update);
        }

        items = document.querySelectorAll(".item");
        for (item of items)
        {
            console.log("added click event")
            item.addEventListener("click", selectedChamp)
        }
    }, 10)
}

function setChampSelector()
{
    /* Create Div for Champ Select */
    var selectdiv = document.getElementById("selector");
    var selecttrait = document.createElement("p");
    selecttrait.setAttribute("class", "traitp selectp");
    selecttrait.setAttribute("id", "selectname");
    selecttrait.innerHTML = "";
    selectdiv.appendChild(selecttrait);

    var selecttrait = document.createElement("p");
    selecttrait.setAttribute("class", "traitp selectp");
    selecttrait.setAttribute("id", "placeholder");
    selecttrait.innerHTML = "";
    selectdiv.appendChild(selecttrait);

    for (const trait of Traits)
    {
        var selectp = document.createElement("p");
        selectp.setAttribute("class", "traitp");
        selectp.innerHTML = trait;
        selectdiv.appendChild(selectp);
        
        var selecttrait = document.createElement("p");
        selecttrait.setAttribute("class", "traitp selectp");
        selecttrait.setAttribute("id", "select"+trait);
        selecttrait.innerHTML = 0;
        selectdiv.appendChild(selecttrait);
    }
}

function update()
{
    all = [bluebans, redbans, bluepicks, redpicks]
    for (a of all)
    {
        var duelist = 0;
        var domination = 0;
        var tank = 0;
        var guardian = 0;
        var destruction = 0;
        var engage = 0;
        var punisher = 0;
        var joker = 0;
        var slayer = 0;
        var global = 0;
        var diseng = 0;
        var cc = 0;
        var mobility = 0;
        for (const e of a)
        {
            if (e.firstElementChild !== null)
            {
                var t = e.firstElementChild.id;
                duelist += jsonObject[t].duelist;
                domination += jsonObject[t].domination;
                tank += jsonObject[t].tank;
                guardian += jsonObject[t].guardian;
                destruction += jsonObject[t].destruction;
                engage += jsonObject[t].engage;
                punisher += jsonObject[t].punisher;
                joker += jsonObject[t].joker;
                slayer += jsonObject[t].slayer;
                global += jsonObject[t].global;
                diseng += jsonObject[t].disengage;
                cc += jsonObject[t].crowdcontrol;
                mobility += jsonObject[t].mobility;
            }
        }
        switch(a)
        {
            case bluebans:
                str = "blueban";
                break;
            case redbans:
                str = "redban";
                break;
            case bluepicks:
                str = "bluepick"
                break;
            case redpicks:
                str = "redpick";
                break;
        }
        document.getElementById(str + "global").innerHTML = global;
        document.getElementById(str + "duelist").innerHTML = duelist;
        document.getElementById(str + "domination").innerHTML = domination;
        document.getElementById(str + "tank").innerHTML = tank;
        document.getElementById(str + "guardian").innerHTML = guardian;
        document.getElementById(str + "destruction").innerHTML = destruction;
        document.getElementById(str + "engage").innerHTML = engage;
        document.getElementById(str + "punisher").innerHTML = punisher;
        document.getElementById(str + "joker").innerHTML = joker;
        document.getElementById(str + "slayer").innerHTML = slayer;
        document.getElementById(str + "disengage").innerHTML = diseng;
        document.getElementById(str + "crowdcontrol").innerHTML = cc;
        document.getElementById(str + "mobility").innerHTML = mobility;
    }
    highlight();
}

function highlight()
{
    /* Highlight the superior Trait-Value */
    for (const trait of Traits)
    {
        var blueb = parseInt(document.getElementById("blueban" + trait).innerHTML);
        var redb = parseInt(document.getElementById("redban" + trait).innerHTML);
        document.getElementById("blueban" + trait).style.fontWeight = "normal";
        document.getElementById("redban" + trait).style.fontWeight = "normal";
        if (blueb == redb && blueb != 0)
        {
            document.getElementById("blueban" + trait).style.fontWeight = "bolder";
            document.getElementById("redban" + trait).style.fontWeight = "bolder";
        }
        else if (blueb > redb)
        {
            document.getElementById("blueban" + trait).style.fontWeight = "bolder";
        }
        else if (redb > blueb)
        {
            document.getElementById("redban" + trait).style.fontWeight = "bolder";
        }

        var bluep = parseInt(document.getElementById("bluepick" + trait).innerHTML);
        var redp = parseInt(document.getElementById("redpick" + trait).innerHTML);
        document.getElementById("bluepick" + trait).style.fontWeight = "normal";
        document.getElementById("redpick" + trait).style.fontWeight = "normal";
        if (bluep == redp && bluep != 0)
        {
            document.getElementById("bluepick" + trait).style.fontWeight = "bolder";
            document.getElementById("redpick" + trait).style.fontWeight = "bolder";
        }
        else if (bluep > redp)
        {
            document.getElementById("bluepick" + trait).style.fontWeight = "bolder";
        }
        else if (redp > bluep)
        {
            document.getElementById("redpick" + trait).style.fontWeight = "bolder";
        }
    }
}

function selectedChamp()
{
    console.log("Clicked");
    setTimeout(() => {
        document.getElementById("selectname").innerHTML = jsonObject[this.id].name;
        document.getElementById("selectglobal").innerHTML = jsonObject[this.id].global;
        document.getElementById("selectduelist").innerHTML = jsonObject[this.id].duelist;
        document.getElementById("selectdomination").innerHTML = jsonObject[this.id].domination;
        document.getElementById("selecttank").innerHTML = jsonObject[this.id].tank;
        document.getElementById("selectguardian").innerHTML = jsonObject[this.id].guardian;
        document.getElementById("selectdestruction").innerHTML = jsonObject[this.id].destruction;
        document.getElementById("selectengage").innerHTML = jsonObject[this.id].engage;
        document.getElementById("selectpunisher").innerHTML = jsonObject[this.id].punisher;
        document.getElementById("selectjoker").innerHTML = jsonObject[this.id].joker;
        document.getElementById("selectslayer").innerHTML = jsonObject[this.id].slayer;
        document.getElementById("selectdisengage").innerHTML = jsonObject[this.id].disengage;
        document.getElementById("selectcrowdcontrol").innerHTML = jsonObject[this.id].crowdcontrol;
        document.getElementById("selectmobility").innerHTML = jsonObject[this.id].mobility;
    }, 10)
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} 

function recommendPick()
{
    document.getElementById("bluepickglobal").innerHTML;
    document.getElementById("bluepickduelist").innerHTML;
    document.getElementById("bluepickdomination").innerHTML;
    document.getElementById("bluepicktank").innerHTML;
    document.getElementById("bluepickguardian").innerHTML;
    document.getElementById("bluepickdestruction").innerHTML;
    document.getElementById("bluepickengage").innerHTML;
    document.getElementById("bluepickpunisher").innerHTML;
    document.getElementById("bluepickjoker").innerHTML;
    document.getElementById("bluepickslayer").innerHTML;
    document.getElementById("bluepickdisengage").innerHTML;
    document.getElementById("bluepickcrowdcontrol").innerHTML;
    document.getElementById("bluepickmobility").innerHTML;
}

function recommendBan()
{
    document.getElementById("redpickglobal").innerHTML;
    document.getElementById("redpickduelist").innerHTML;
    document.getElementById("redpickdomination").innerHTML;
    document.getElementById("redpicktank").innerHTML;
    document.getElementById("redpickguardian").innerHTML;
    document.getElementById("redpickdestruction").innerHTML;
    document.getElementById("redpickengage").innerHTML;
    document.getElementById("redpickpunisher").innerHTML;
    document.getElementById("redpickjoker").innerHTML;
    document.getElementById("redpickslayer").innerHTML;
    document.getElementById("redpickdisengage").innerHTML;
    document.getElementById("redpickcrowdcontrol").innerHTML;
    document.getElementById("redpickmobility").innerHTML;
}