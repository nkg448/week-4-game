  $(document).ready(function() {
      
      function drawScreen(allChars) {
        for(i=0;i<allChars.length;i++)
        {
          if(allChars[i].isFighter){
            if(allChars[i].isActive){
              var activeFighter=i;
              allChars[i].panel.attr("class","panel panel-success active col-md-6");
              }
            else{
              allChars[i].panel.attr("class","panel panel-success fighter col-md-3");
              $("#fighters").append(allChars[i].panel);
              console.log(allChars[i].id);
            }
          }
          if(allChars[i].isEnemy){
            if(allChars[i].isActive){
              var activeEnemy=i;
              allChars[i].panel.attr("class","panel panel-danger active col-md-6");
            } 
            else if(!allChars[i].isDead){  
              allChars[i].panel.attr("class","panel panel-danger enemy col-md-3");
              $("#enemies").append(allChars[i].panel);
            }
          }
        }
        $("#arena").empty();
        if(activeFighter) $("#arena").append(allChars[activeFighter].panel);
        if(activeEnemy) $("#arena").append(allChars[activeEnemy].panel);
        if(activeFighter && activeEnemy)
        {
            if(allChars[activeFighter].isDead)
              $("#arena").append(gamePanel(2));
            else
              if(allChars[activeEnemy].isDead)
                $("#arena").append(gamePanel(3));
              else
                $("#arena").append(gamePanel(1));
            
        }
        


      };

      function gamePanel(options){
        var buttonDiv = $("<div>");
        buttonDiv.addClass("col-md-12");
        
        if(options==1)
        {
          var someText = $("<p class=\"text-center\">The battle's begun! Have at your foe!</p>");
          var button1 = $("<button type=\"button\" class=\"btn btn-warning btn-block attack\">Attack!</button>");
        }
        
        if(options==2)
        {
          var someText = $("<p class=\"text-center\">You've lost : ( Try again!</p>");
          var button1 = $("<button type=\"button\" class=\"btn btn-danger btn-block reset\">Reset!</button>");
        }

        if(options==3)
        {
          var someText = $("<p class=\"text-center\">You've won this round! Onto the next ruffian!</p>");
          var button1 = $("<button type=\"button\" class=\"btn btn-danger btn-block next\">Pick Next Enemy</button>");
        }

        if(options==4)
        {
          var someText = $("<p class=\"text-center\">You've slayed all who came before you. Well done!</p>");
          var button1 = $("<button type=\"button\" class=\"btn btn-danger btn-block reset\">Play Again</button>");
        }

        buttonDiv.append(someText,button1);
        return buttonDiv;
      }

      function gamePlay(fighter, enemy){
        fighter.currentHP-=enemy.Damage;
        enemy.currentHP-=fighter.Damage;
        fighter.Damage+=fighter.initialDamage;
        if(fighter.currentHP <= 0)   
          fighter.isDead=true;
        if(enemy.currentHP <= 0)
          enemy.isDead=true;     
        //console.log(fighter.currentHP);
        //console.log(enemy.currentHP);
      }


      function makePanel(someChar){
        //declare elements of panel
        var panel = $("<div>");
        var panelHeading = $("<div>");
        var panelBody = $("<div>");
        var panelFooter= $("<div>");
        var img = $("<img>");

        //set classes, fill information/images
        //header
        panelHeading.addClass("panel-heading text-center");
        panelHeading.html(someChar.name);
        //body
        panelBody.addClass("panel-body");
        img.attr("src",someChar.image);
        img.addClass("img-responsive");
        panelBody.append(img);
        //footer
        panelFooter.addClass("panel-footer");
        panelFooter.html("HP: " + someChar.currentHP + "<br>Damage: " + someChar.Damage);
        
        //put it all together
        panel.append(panelHeading);
        panel.append(panelBody);
        panel.append(panelFooter);
        panel.attr("id",someChar.id);
        someChar.panel = panel;
      };

      var fighterChosen=false;
      var enemyChosen=false;

      var charDarthSid = {
        name: "Darth Sidious",
        id:"darthsid",
        initialHP: 180,
        currentHP: 180,
        initialDamage : 20,
        Damage: 20,
        isFighter: true,
        isEnemy: false,
        isActive: false,
        isLocked: false,
        isDead: false,
        isChampion: false,
        image: "assets/images/sid.jpg"
        //panel: ""

      };

      var charDarthMaul = {
        name: "Darth Maul",
        id: "darthmaul",
        initialHP: 140,
        currentHP: 140,
        initialDamage : 5,
        Damage: 5,
        isFighter: true,
        isEnemy: false,
        isActive: false,
        isLocked: false,
        isDead: false,
        isChampion: false,
        image: "assets/images/maul.jpg"
        //panel:""
      };

      var charLukeSky = {
        name: "Luke Skywalker",
        id: "lukesky",
        initialHP: 125,
        currentHP: 125,
        initialDamage : 6,
        Damage: 6,
        isFighter: true,
        isEnemy: false,
        isActive: false,
        isLocked: false,
        isDead: false,
        isChampion: false,
        image: "assets/images/luke.jpg"
        //panel:""
      };

      var charObi = {
        name: "Obi Wan Kenobi",
        id: "obi",
        initialHP: 160,
        currentHP: 160,
        initialDamage : 3,
        Damage: 3,
        isFighter: true,
        isEnemy: false,
        isActive: false,
        isLocked: false,
        isDead: false,
        isChampion: false,
        image: "assets/images/ben.jpg"
        //panel:""
      };

      makePanel(charLukeSky);
      makePanel(charDarthMaul);
      makePanel(charDarthSid);
      makePanel(charObi);

      //NOTE: For some reason, whichever obj is first breaks the redraw process, putting in a dummy value fixes it. 

      var allChars=[0,charLukeSky,charDarthSid,charDarthMaul,charObi];
      drawScreen(allChars);

      $(document).on("click", ".fighter", function() {
        for(i=0;i<allChars.length;i++){
          if(allChars[i].id===this.id){
            allChars[i].isActive=true;
            fighterChosen=i;
          } 
          else{
            allChars[i].isFighter=false;
            allChars[i].isEnemy=true;
          }
        }

        drawScreen(allChars);
        console.log(this);

      });

      $(document).on("click", ".enemy", function() {
        for(i=0;i<allChars.length;i++){
          if(allChars[i].id===this.id && !allChars[i].isLocked  ){
            allChars[i].isActive=true;
            enemyChosen=i;

          } 
          else{
            allChars[i].isLocked=true;
          }
        }
                
        drawScreen(allChars);
        console.log(this);

      });

      $(document).on("click", ".attack", function() {
        if(!(allChars[fighterChosen].isDead && allChars[enemyChosen].isDead)){
        console.log(allChars[fighterChosen].HP);
        console.log(allChars[enemyChosen].HP);
        gamePlay(allChars[fighterChosen],allChars[enemyChosen]);
        makePanel(allChars[fighterChosen]);
        makePanel(allChars[enemyChosen]);
        drawScreen(allChars);
        }
        
      });

      $(document).on("click", ".reset", function() {
        for(i=0;i<allChars.length;i++){
          allChars[i].isFighter=true;
          allChars[i].isEnemy= false;
          allChars[i].isActive= false;
          allChars[i].isLocked= false;
          allChars[i].isDead= false;
          allChars[i].currentHP=allChars[i].initialHP;
          allChars[i].Damage=allChars[i].initialDamage;
          if(i!=0)
          makePanel(allChars[i]);

          }
          $("#arena").empty();
          $("#fighters").empty();
          $("#enemies").empty();
        drawScreen(allChars); 
        //console.log(this);

      });

      $(document).on("click", ".next", function() {
        for(i=0;i<allChars.length;i++){
          if(i!=fighterChosen||i!=enemyChosen)
            allChars[i].isLocked=false;
          if(i==enemyChosen)
            allChars[i].isActive=false;
          if(i==fighterChosen)
            {
              //allChars[i].Damage+=20;
              makePanel(allChars[i]);
            }
        }
        drawScreen(allChars);
      });
  
    });
