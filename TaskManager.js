class TaskManager extends HTMLElement
{
    constructor()
    {
        super();
        try
        {
            this.id = this.getAttribute("id") || 'input';
            this.options = TaskManager.convertToArray(this.getAttribute("options") || null);
            this.values = TaskManager.convertToArray(this.getAttribute("values") || null);

            // Handling missing attributes
            if(this.options == null && this.values === null)
            {
                throw new Error('Values and Options Attribute Missing')
            }
            if(this.options == null)
            {
                throw new Error('Options is not defined');
            }
            if(this.values === null)
            {
                throw new Error('Values is not defined');
            }

            this.styleSheetText = `.result {
                position: relative;
                top: 10px;
                width: 100vw;
                color: green;
                display: grid;
                grid-gap: 15px;
                place-items: center;
            }
            
            .result span {
                position: absolute;
                left: 0;
            }
            
            .result p {
                text-align: center;
                background: #f2f2f2;
                padding: 5px 10px 5px 10px;
                border: 1px solid black;
                width: 350px;
            }`;
    
            this.root = this.attachShadow({mode: "open"});
    
            this.create();
    
            this.selectElement = this.root.getElementById(this.id);
            this.container = this.root.querySelector('.result-container');
        } catch(err) {
            console.log(`%c ${err}`, 'color: red;');
        }
    }

    create()
    {
        const select = document.createElement("select");
        const resultContainer = document.createElement("div");
        const optionTitle = document.createElement("option");
        const optionGroup = document.createElement("optgroup");

        optionTitle.value = "";
        optionTitle.textContent = "--Please Choose a Task--";
        optionTitle.style = "text-align: center;"

        select.appendChild(optionTitle);

        optionGroup.label = "<Tasks>";
        optionGroup.style = "text-align: center;";

        for(let i = 0; i < this.options.length; ++i)
        {
            const option = document.createElement("option");

            option.value = this.values[i];
            option.textContent = this.options[i];
            
            optionGroup.appendChild(option);
        }

        select.appendChild(optionGroup);

        let style = document.createElement("style");
        style.textContent = this.styleSheetText;

        resultContainer.setAttribute("class", "result-container");
        select.id = this.id;
        
        select.addEventListener("input", this.selectTask.bind(this));

        this.root.appendChild(select);
        this.root.appendChild(resultContainer);
        this.root.appendChild(style);
    }

    selectTask()
    {
        if(this.selectElement.value == this.values[0])
        {
            this.firstTask();
        } else if (this.selectElement.value == this.values[1]) {
            this.secondTask();
        } else {
            this.clear();
        }
    }

    clear()
    {   
        try
        {
            console.log('%c Container Cleard!', 'color: yellow;');
            while(this.container.firstChild)
            {
                this.container.removeChild(this.container.firstChild);
            }
        } catch(err) {
            console.log(`%c ${err}`, 'color: red;');
        }
    }

    // First Task

    createFirstTask()
    {
        this.clear();
        console.log('%c Creating first task...', 'color: green; font-weight: 900;');

        const div = document.createElement("div");
        const span = document.createElement("span");
        const p = document.createElement("p");

        span.textContent = "Result:";
        div.setAttribute("class", "result");
        p.id = "out";

        div.appendChild(span);
        div.appendChild(p);

        this.container.appendChild(div);
    }

    async firstTask()
    {
        try
        {
            this.createFirstTask();

            const out = this.root.getElementById('out');
    
            const aSide = parseFloat(window.prompt("Give me the 'a' side length!"));
            const bSide = parseFloat(window.prompt("Give me the 'b' side length!"));
            
            out.textContent = `District: ${await TaskManager.kerulet(aSide, bSide)}; Area: ${await TaskManager.terulet(aSide, bSide)};`;
        } catch(err) {
            console.log(`%c ${err}`, 'color: red;')
        }
    }

    // Second Task

    createSecondTask()
    {
        this.clear();
        console.log('%c Creating second task...', 'color: green; font-weight: 900;');

        const div = document.createElement("div");
        const p = document.createElement("p");

        p.id = 'out-second-task';
        p.style = "color: red; padding-top: 20px;"
        div.setAttribute("class", 'red-out');

        div.appendChild(p);
        this.container.appendChild(div);
    }

    async secondTask()
    {
        try
        {
            this.createSecondTask();

            const out = this.root.getElementById('out-second-task');
    
            this.selectElement.disabled = "disabled";
    
            let array = [];
            for(let i = 0; i < 5; ++i)
            {
                let randNum = await TaskManager.generateRandomNumber();
                array.push(randNum);
                out.textContent += `${randNum} `;
            }
    
            let min = array[0];
            for(let i = 0; i < array.length; ++i)
            {
                if(array[i] < min){ min = array[i] }
            }
    
            this.selectElement.removeAttribute("disabled");
            
            alert(`Smallest number: ${min}`);
        } catch(err) {
            console.log(`%c ${err}`, 'color: red;')
        }
    }

    // static functions

    static convertToArray(str)
    {
        try
        {
            let newArr = str.split(' ');
            return newArr;
        } catch {
            return null;
        }

    }

    static terulet(a, b)
    {
        return new Promise((resolve, reject) => {
            if(a && b)
            {
                resolve(a * b);
            } else {
                reject(new Error("Invalid value"));
            }
        });
    }

    static kerulet(a, b)
    {
        return new Promise((resolve, reject) => {
            if (a, b)
            {
                resolve(2 * (a + b));
            } else {
                reject(new Error("Invalid value"));
            }
        });
    }

    static generateRandomNumber()
    {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * 100));
            }, 1000);
        });
    }
}

customElements.define('task-manager', TaskManager);