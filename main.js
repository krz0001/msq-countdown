import msqQuests from './msqQuests.json' assert {type: 'json'};

// get the text from the user with the quest-name form 
const questName = document.getElementById('quest-name');

// override submit function of the form
questName.addEventListener('submit', (e) => {
    e.preventDefault();
    const userChapter = questName.chapter.value;
    const userQuest = questName.quest.value;

    let userQuestNormalized = userQuest.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase();

    console.log(userQuestNormalized);
    
    // if the quest is found in the quests array, print the quest index and the quest text

    const options = {
        includeScore: true,
        limit: 1
    }
    
    const fuse = new Fuse(msqQuests[userChapter].quests, options)
    
    const result = fuse.search(userQuestNormalized)

    // update strings in the page
    document.querySelector('#found-user-quest').innerHTML = result[0].item;
    document.querySelector('#chapter-progression__text b').innerHTML  = msqQuests[userChapter].name;
    document.getElementById('countdown-number').innerHTML = `${msqQuests[userChapter].quests.length - result[0].refIndex}`;

    // update the progress bar
    const progressBar = document.querySelector('#chapter-progression__bar progress');
    progressBar.value = result[0].refIndex;
    progressBar.max = msqQuests[userChapter].quests.length;



});


// on page load, add all of the chapters to the dropdown menu
for (let i = 0; i < msqQuests.length; i++) {    
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = msqQuests[i].name;
    questName.chapter.appendChild(option);
}
