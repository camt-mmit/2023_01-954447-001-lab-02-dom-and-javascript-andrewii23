function createComponent(componentElement) {
  const tmpInput = componentElement.querySelector("template.app-tmp-input");
  const inputList = tmpInput.parentElement;

  const updateResult = () => {
    const children = [...inputList.children].filter(
      (elem) => elem !== tmpInput
    );

    const result = children.reduce(
      (carry, element) =>
        carry +
        element.querySelector('input[type="number"].app-cmp-input')
          .valueAsNumber,
      0
    );

    [...componentElement.querySelectorAll("output.app-cmp-result")].forEach(
      (elem) => (elem.value = `${result.toLocaleString()}`)
    );
  };

  const updateList = () => {
    updateResult();
    const children = [...inputList.children].filter(
      (elem) => elem !== tmpInput
    );

    children.forEach((element, i) => {
      [...element.querySelectorAll(".app-cmp-input-no")].forEach(
        (elem) => (elem.textContent = `${i + 1}`)
      );
    });

    [...inputList.querySelectorAll(".app-cmd-remove-input")].forEach(
      (elem) => (elem.disabled = children.length === 1)
    );
  };

  const createElement = () => {
    const container = tmpInput.content.cloneNode(true).firstElementChild;

    container.addEventListener("click", (ev) => {
      if (ev.target.matches(".app-cmd-remove-input")) {
        container.remove();

        updateList();
      }
    });
    inputList.append(container);
    updateList();
  };

  componentElement.addEventListener("click", (ev) => {
    if (ev.target.matches(".app-cmd-add-input")) {
      createElement();
    }
  });

  inputList.addEventListener("change", (ev) => {
    if (ev.target.matches("input[type=number].app-cmp-input")) {
      updateResult();
    }
  });

  createElement();
}

document.addEventListener("DOMContentLoaded", () => {
  createComponent(document.body);
});
