let bookmarks = []
let loaded = false;
function addBookmark()
{
    if ($("#name").val() == "" || $("#url").val() == "")
    {
        alert("Please enter some value !");
    }
    else{
        bookmarks.push({
            title: $("#name").val(),
            url: $("#url").val(),
        });
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        console.log(bookmarks);
    }
}

$("button").click(addBookmark);

