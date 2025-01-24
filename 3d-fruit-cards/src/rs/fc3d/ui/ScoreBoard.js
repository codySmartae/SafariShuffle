define([
    'rs/game/Scroller',
    'rs/game/BasePanel'
],
function (Scroller, BasePanel) {

    "use strict";

    Scoreboard.prototype = Object.create(BasePanel.prototype);
    Scoreboard.prototype.constructor = Scoreboard;

    var CONTENT_PATH = 'assets/text/helpcontent.html';

    /**
     * Help panel class
     * @class HelpPanel
     * @constructor
     */
    function Scoreboard() {

        BasePanel.prototype.constructor.call(this);
    }

    /**
     * Init panel
     * @method init
     */
    /*Scoreboard.prototype.init = function () {

        BasePanel.prototype.init.call(this);
        var el = this.el;
        el.classList.add('rs-fc3d-helppanel');
        el.style.width = el.style.height = '90%';

        // Playing instruction
        var c = this.container = document.createElement('div');
        c.className = 'rs-helpcontainer';
        el.appendChild(c);

        // Setup scroller
        this.scroller = new Scroller(this.container);

        // Setup content
        var hp = this;
        var req = new XMLHttpRequest();
        req.addEventListener("load", function (e) {
            var result = this.responseText;
            c.innerHTML = result;
        });
        req.open("GET", CONTENT_PATH);
        req.send();
    };

    return HelpPanel;*/
    Scoreboard.prototype.init = function () {
        this.load();
        var el = (this.el = document.createElement("div"));
        el.className = "rs-hscreen";
        el.style.width = el.style.height = "100%";
        el.style.display = "none";
       
        // Header
        this.header = new HomeScreenHeader(this);
    
        // Scoreboard Container
        this.tableContainer = document.createElement("div");
        this.tableContainer.className = "scoreboard-container";
        this.tableContainer.style.margin = "20px auto";
        this.tableContainer.style.width = "80%";
        this.tableContainer.style.textAlign = "center";
    
        var backButton = document.createElement("button");
        backButton.innerText = "Back";
        backButton.className = "back-button";
        backButton.addEventListener("click", this.returnToHome.bind(this));
        this.tableContainer.appendChild(backButton);
    
        // Add a placeholder table for the scoreboard
        this.tableContainer.innerHTML = `
            <h2>Scoreboard</h2>
            <table id="scoreboard-table" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Rank</th>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Score</th>
                </tr>
            </table>
        `;
    
        // Add components to the main screen element
        el.appendChild(this.header.el);
        el.appendChild(this.tableContainer);
    
        // Optional: Call renderScores here if you want to pre-load data on initialization
         this.renderScores();
    };

});
Scoreboard.prototype.load = function () {
    this.el.style.display = "block";
    this.renderScores(); // Fetch scores dynamically
    this.transitionIn();
};

Scoreboard.prototype.renderScores = function () {
    debugger
    console.log("1")
    var table = document.getElementById("scoreboard-table");

    if (!table) return;

    // Clear the table except headers
    table.innerHTML = `
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Rank</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Name</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Score</th>
        </tr>
    `;

    // Perform AJAX request to fetch scoreboard data
    fetch("https://safarishuffleapi.codysmart.ae/api/ScoreboardApi/GetTopThreeScores")
        .then(response => response.json())
        .then(scores => {
            if (Array.isArray(scores) && scores.length > 0) {
                scores.forEach((player, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${player.name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${player.score}</td>
                    `;
                    table.appendChild(row);
                });
            } else {
                // If no scores are found, display a friendly message
                const noDataRow = document.createElement("tr");
                noDataRow.innerHTML = `
                    <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: center;">No scores available</td>
                `;
                table.appendChild(noDataRow);
            }
        })
        .catch(error => {
            console.error("Error fetching scores:", error);
            const errorRow = document.createElement("tr");
            errorRow.innerHTML = `
                <td colspan="3" style="border: 1px solid #ddd; padding: 8px; text-align: center; color: red;">Failed to load scores. Please try again.</td>
            `;
            table.appendChild(errorRow);
        });
};

