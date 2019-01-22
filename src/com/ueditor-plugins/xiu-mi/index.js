import './index.less';

window.UE.registerUI(
  'dialog',
  editor =>
    new window.UE.ui.Button({
      name: 'xiumi-connect',
      title: '秀米',
      onclick: () => {
        const dialog = new window.UE.ui.Dialog({
          iframeUrl: '/dist/html/xiumi/xiumi-ue-dialog-v5.html',
          editor,
          name: 'xiumi-connect',
          title: '秀米图文消息助手',
          cssRules:
            `width: ${window.innerWidth - 60}px;` +
            `height: ${window.innerHeight - 60}px;`,
        });
        dialog.render();
        dialog.open();
      },
    })
);
