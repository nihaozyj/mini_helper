/**
 * 打开一个弹窗，输入一段内容，并返回输入的内容
 * @param {string} title 弹窗标题
 * @param {string} message 文本框提示信息
 * @returns {Promise<string>} 用户输入的内容
 */
async function openInputDialog(title, message) {
  const id = `modal-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const template = `<div class="modal fadeIn" id="${id}"> <div class="modal-content input"> <div class="header"> <button data-tyle="cancel">取消</button> <h2>${title}</h2> <button data-tyle="enter">确认</button> </div> <input type="text" value="${message}" placeholder="请输入内容" /> </div> </div>`;

  document.body.insertAdjacentHTML('beforeend', template);

  return await new Promise(resolve => {
    const modal = document.querySelector(`#${id}`);
    const input = modal.querySelector('input');
    const cancelBtn = modal.querySelector('[data-tyle="cancel"]');
    const enterBtn = modal.querySelector('[data-tyle="enter"]');

    const close = (data) => {
      modal.classList.remove('fadeIn');
      modal.classList.add('fadeOut');
      setTimeout(() => {
        modal.remove();
        data ? resolve(data) : resolve(null);
      }, 300);
    };

    cancelBtn.addEventListener('click', () => close());
    enterBtn.addEventListener('click', () => close(input.value));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        close(input.value);
      }
    });
  });
}

/**
 * 打开一个弹窗，下拉框进行选择，并返回选中的内容
 * @param {string} title 弹窗标题
 * @param {Array<{value: string, label: string}>} selects 用户选择列表
 * @param {string} value 默认值
 * @returns {Promise<string>} 用户输入的内容
 */
async function openSelectDialog(title, selects, value) {
  const id = `modal-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const selectsStr = selects.map(item => `<option value="${item.value}" ${item.value === value ? 'selected' : ''}>${item.label}</option>`).join('');
  const template = `<div class="modal fadeIn" id="${id}"> <div class="modal-content select"> <div class="header"> <button data-tyle="cancel">取消</button> <h2>${title}</h2> <button data-tyle="enter">确认</button> </div> <select value="${value}">${selectsStr}</select> </div> </div>`;

  document.body.insertAdjacentHTML('beforeend', template);

  return new Promise(resolve => {
    const modal = document.querySelector(`#${id}`);
    const select = modal.querySelector('select');
    const cancelBtn = modal.querySelector('[data-tyle="cancel"]');
    const enterBtn = modal.querySelector('[data-tyle="enter"]');

    const close = (data) => {
      modal.classList.remove('fadeIn');
      modal.classList.add('fadeOut');
      setTimeout(() => {
        modal.remove();
        resolve(data);
      }, 300);
    };

    cancelBtn.addEventListener('click', () => close(null));
    enterBtn.addEventListener('click', () => close(select.value));
  });
}

/**
 * 打开一个弹窗，输入一段内容，并返回输入的内容
 * @param {string} title 弹窗标题
 * @param {string} message 文本框提示信息
 * @returns {Promise<string>} 用户输入的内容
 */
async function openTextareaDialog(title, message) {
  const id = `modal-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const template = `<div class="modal fadeIn" id="${id}"> <div class="modal-content textarea"> <div class="header"> <button data-tyle="cancel">取消</button> <h2>${title}</h2> <button data-tyle="enter">确认</button> </div> <textarea type="text" placeholder="请输入内容">${message}</textarea> </div> </div>`;

  document.body.insertAdjacentHTML('beforeend', template);

  return new Promise(resolve => {
    const modal = document.querySelector(`#${id}`);
    const textarea = modal.querySelector('textarea');
    const cancelBtn = modal.querySelector('[data-tyle="cancel"]');
    const enterBtn = modal.querySelector('[data-tyle="enter"]');

    const close = (data) => {
      modal.classList.remove('fadeIn');
      modal.classList.add('fadeOut');
      setTimeout(() => {
        modal.remove();
        data ? resolve(data) : resolve(null);
      }, 300);
    };

    cancelBtn.addEventListener('click', () => close());
    enterBtn.addEventListener('click', () => close(textarea.value));
  });
}

export default {
  openInputDialog,
  openSelectDialog,
  openTextareaDialog
};
