$(document).ready(function () {
    // Create the bookmark list and back button dynamically
    const $bookmarkList = $('<div class="bookmark-list"></div>');
    const $backButton = $('<button class="back-btn">Back to Add Bookmark</button>');

    // Append to container but hide initially
    $(".container").append($bookmarkList.hide());
    $(".container").append($backButton.hide());

    // Function to load bookmarks from localStorage
    function loadBookmarks() {
        $bookmarkList.empty();
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

        if (bookmarks.length === 0) {
            $bookmarkList.append('<p style="text-align:center;">No bookmarks yet.</p>');
        } else {
            bookmarks.forEach((bookmark, index) => {
                const item = $(`
                    <div class="bookmark-item">
                        <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
                        <button style="float:right;" data-index="${index}" class="delete-btn">❌</button>
                    </div>
                `);
                $bookmarkList.append(item);
            });
        }
    }

    // Add bookmark to localStorage
    $("button").first().on("click", function () {
        const name = $("#name").val().trim();
        const url = $("#url").val().trim();

        if (!name || !url) {
            alert("Please fill in both fields.");
            return;
        }

        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        bookmarks.push({ name, url });
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

        $("#name").val("");
        $("#url").val("");
        alert("Bookmark added!");
    });

    // Show bookmarks view
    $("span").on("click", function () {
        $("h1, .input-items, span").hide();
        loadBookmarks();
        $bookmarkList.show();
        $backButton.show();
    });

    // Back to add form view
    $backButton.on("click", function () {
        $bookmarkList.hide();
        $backButton.hide();
        $("h1, .input-items, span").show();
    });

    // Delete a bookmark
    $bookmarkList.on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        bookmarks.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        loadBookmarks();
    });
});
