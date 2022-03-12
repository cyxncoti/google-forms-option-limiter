function updateForm() {
  class Question {
    constructor(title, sheet, range, emptyDisplay) {
      this.title = title;
      this.sheet = sheet;
      this.range = range;
      this.emptyDisplay = emptyDisplay;
    }
  }

  const FORM_ID = 'FORM_ID';
  const questions = [ // Titles must be unique or all questions with same title will be set to same option values!
    new Question('title', 'sheet', 'range', 'emptyDisplay'),
  ]
 
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formItems = FormApp.openById(FORM_ID).getItems(); // Item[]
  for (let q of questions) {
    const options = ss.getSheetByName(q.sheet).getRange(q.range).getDisplayValues().flat()
    .filter(option => option != '');
    if (options.length == 0) options.push(q.emptyDisplay)

    formItems.filter(item => item.getTitle() == q.title)
    .forEach(item => {
      switch (item.getType()) {
        case FormApp.ItemType.MULTIPLE_CHOICE:
          item.asMultipleChoiceItem().setChoiceValues(options);
          break;
        case FormApp.ItemType.CHECKBOX:
          item.asCheckboxItem().setChoiceValues(options);
          break;
        case FormApp.ItemType.LIST:
          item.asListItem().setChoiceValues(options);
      }
    });
  }
}
