export const exWrapper = 'ex-wrapper'

export const explorerParentStyle = `
  #explorer {
    position: absolute;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 800px;
    top: 50px;
    height: 500px;
    z-index: 500;
  }
`

export const explorerIconStyle = `
  #explorer-icon {
    color: #9095ad;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
  }

  #explorer-icon:hover {
    color: #bec2d3;
    transition: 0.1s;
  }
`

export const explorerStyle = `
  #${exWrapper} {
    display: none;
  }

  .ex-top-bar {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    color: red;
    height: 50px;
  }

  .ex-wrapper {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border: 2px solid gray;
    padding: 12px;
    font-size: 1.5rem;
    border-radius: 8px;
    background: #f3f4f6;
    /* background: rgba(255, 255, 255, 1); */
    box-shadow: 0px 5px 20px 1px;
    height: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .ex-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .ex-spec-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    margin: 5px 0;
  }

  .ex-input[type="checkbox"] {
    margin: 5px 8px 0 0;
  }

  .ex-ul {
    margin: 10px 0;
    /* height: 100%; */
  }

  .ex-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: flex-end;
  }

  #ex-close-explorer {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ex-submit-button {
    width: 100px;
  }

  .ex-button {
    font-size: 1.5rem;
    background: #4956e3;
    color: white;
    border-radius: 4px;
    border: none;
    padding: 11px 16px;
    cursor: pointer;
  }

  .ex-button:hover {
    transition: 0.1s;
    outline: 2px solid #4956e338;
  }
`