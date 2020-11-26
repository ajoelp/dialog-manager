type DialogObject = { [name: string]: any };

class DialogService {
  dialogs: DialogObject = {};

  register(name: string, dialog: any) {
    this.dialogs[name] = dialog;
  }

  registerMultiple(dialogs: DialogObject) {
    this.dialogs = dialogs;
  }

  get(name: string) {
    if (!this.dialogs[name]) {
      throw new Error(`Dialog ${name} not found`);
    }
    return this.dialogs[name];
  }
}

export default new DialogService();
