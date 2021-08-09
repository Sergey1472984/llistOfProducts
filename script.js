const items = [
    "Молоко",
    "Орехи",
    "Кофе",
    "Сахар",
    "Хлеб",
    "Йогурт",
    "Сок",
    "Бананы",
    "Мандарины",
    "Шоколад",
    "Печенье",
]

if (localStorage.list === undefined) localStorage.list = JSON.stringify(items).toLowerCase()

class DOMelem {
    constructor(elem, parent = 'empty', className = 'empty'){
        this.elem = document.createElement(`${elem}`)
        this.parent = parent
        if (this.parent !== 'empty') {
            this.parent.appendChild(this.elem)
        }
        if (className !== 'empty') this.elem.classList.add(`${className}`)
    }
}

class filledElem extends DOMelem {
    constructor(elem, parent = 'empty', className = 'empty', HTML){
        super(elem, parent, className)
        this.elem.innerHTML = HTML
    }
}

class Input extends DOMelem{
    constructor(parent = 'empty', className = 'empty'){
        super('input', parent, className)
        this.procEvent()
    }
    procEvent(){
        this.elem.addEventListener('input', () => {
            list.update()
            console.log(input.elem.value)
            if (list.list.includes(this.elem.value) || this.elem.value === ''){
                button.elem.disabled = true
            }else button.elem.disabled = false

        })
    }
    
}

class Button extends DOMelem{
    constructor(parent = 'empty', className = 'empty'){
        super('button', parent, className)
        this.elem.disabled = true
        this.procEvent()       
    }
    procEvent(){
        this.elem.addEventListener('click', () => {
            let products = JSON.parse(localStorage.list)
            products.push(input.elem.value.toLowerCase())
            localStorage.list = JSON.stringify(products)
            input.elem.value = ''
            list.update()
        })
    }
}

class List extends DOMelem{
    constructor(parent = 'empty', className = 'empty', list){
        super('ul', parent, className)
        this.list = JSON.parse(localStorage.list)
        this.update()
    }
    update(){
        this.elem.innerHTML = ''
        this.list = JSON.parse(localStorage.list)
        this.list = this.list.filter(el => el.includes(input.elem.value.toLowerCase()))
        this.list.forEach((el) => {
            this.elem.appendChild((new filledElem('li', 'empty', 'products', el)).elem)  
        })

    }
}

const input = new Input(document.querySelector('.operations'), 'input')
const list = new List(document.querySelector('.content'), 'list', items)
const button = new Button(document.querySelector('.operations'), 'button')
button.elem.innerHTML = 'add'
