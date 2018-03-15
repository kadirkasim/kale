var kale = function kkalert(title , desc = '' , type = 'default', callback = null){
    this.title = title;
    this.desc = desc;
    this.type = type;
    this.callback = callback;
    this.button = null;
    this.buttonColor = '#49a942';
    this.icon = null;
    this.cancellation = false;
    this.cancelText = 'Cancel';
    this.input = false;
    this.textarea = false;
    var inputValue = '';
    if(typeof this.type === 'string'){
        switch (this.type){
            case 'info':
                this.color = '#00a0af';
                this.button = 'Ok';
                this.buttonColor = '#00a0af';
                this.icon = 'info';
                break;
            case 'warning':
                this.color = '#f48924';
                this.button = 'Sure';
                this.buttonColor = '#f48924';
                this.icon = 'question';
                this.cancellation = true;
                break;
            case 'success':
                this.color = '#49a942';
                this.button = 'Done';
                this.buttonColor = '#49a942';
                this.icon = 'check';
                break;
            case 'error':
                this.color = '#ff322e';
                this.button = 'Got it!';
                this.buttonColor = '#ff322e';
                this.icon = 'exclamation-triangle';
                break;
            case 'yesno':
                this.color = '#49a942';
                this.button = 'Yes';
                this.buttonColor = '#49a942';
                this.icon = '';
                this.cancelText = 'No';
                this.cancellation = true;
                break;
            case 'input':
                this.color = '#49a942';
                this.button = 'Ready';
                this.buttonColor = '#49a942';
                this.icon = '';
                this.cancellation = true;
                this.input = true;
                break;

            case 'text':
                this.color = '#49a942';
                this.button = 'Ready';
                this.buttonColor = '#49a942';
                this.icon = '';
                this.cancellation = true;
                this.textarea = true;
                break;

            default:
                this.color = '#004d73';
                this.buttonColor = '#004d73';
                button == null ? this.button = 'OK' : this.button = button;
                icon == null ? this.icon = '' : this.icon = icon;
                break;
        }
    }else{
   
        type.color == null ? this.color = '#004d73' : this.color = '#'+type.color;
        type.button == null ? this.button = 'Ok' : this.button = type.button;
        type.buttonColor == null ? this.buttonColor = '#49a942' : this.buttonColor = '#'+type.buttonColor;        
        this.icon = null ? this.icon = '' : this.icon = type.icon;
        type.cancellation == null ? this.cancellation = false : this.cancellation = type.cancellation;
        type.cancelText == null ? this.cancelText = 'Cancel' : this.cancelText = type.cancelText;
        type.input == null ? this.input = false : this.input = type.input;
        type.textarea == null ? this.textarea = false : this.textarea = type.textarea;
    
    }
    this.show = function(){
        document.body.classList.add("noScroll");
        var kale_cont = document.createElement("div");
        kale_cont.id = "kale";
        kale_inner = document.createElement("div");
        kale_inner.classList.add("kale-inner");
        kale_cont.appendChild(kale_inner);
        if (this.icon != 'none') {
            var kale_inner_i = document.createElement("i");
            kale_inner_i.classList.add("icon");
            kale_inner_i.classList.add('fas');
            kale_inner_i.classList.add("fa-" + this.icon);
            kale_inner_i.style.color = this.color;
            kale_inner.appendChild(kale_inner_i);
        }
        if (this.title != 'none'){
            var kale_inner_h1 = document.createElement('h1');
            var t = document.createTextNode(this.title);
            kale_inner_h1.appendChild(t);
            kale_inner.appendChild(kale_inner_h1);
        }
        if(this.desc.trim() != ''){
            var kale_inner_p = document.createElement('p');
            var d = document.createTextNode(this.desc);
            kale_inner_p.appendChild(d);
            kale_inner.appendChild(kale_inner_p);
        } 
        if(this.input){
            var kale_inner_input = document.createElement('input');
            kale_inner_input.id = "kale-input";
            kale_inner_input.type = 'text';
            kale_inner_input.placeholder = 'Type here ..';
            kale_inner.appendChild(kale_inner_input);
        }

        if(this.textarea){
            var kale_inner_textarea = document.createElement('textarea');
            kale_inner_textarea.id = "kale-input";
            kale_inner_textarea.placeholder = 'Type here ..';
            kale_inner.appendChild(kale_inner_textarea);
        }

        var kale_inner_btn_cont = document.createElement('div');
        kale_inner_btn_cont.style.textAlign = 'center';
        kale_inner.appendChild(kale_inner_btn_cont);
        var kale_inner_btn_ok = document.createElement('button');
        var btn_ok = document.createTextNode(this.button);
        kale_inner_btn_ok.appendChild(btn_ok);
        kale_inner_btn_ok.style.backgroundColor = this.buttonColor;
        kale_inner_btn_ok.onclick = function() {
            if(this.input || this.textarea){
                inputValue = document.getElementById('kale-input');
                if(inputValue == ''){
                    cancel();
                } else{
                    ok(inputValue);
                }
            }else{
                ok(true);
            }

        };
        kale_inner_btn_cont.appendChild(kale_inner_btn_ok);
        if(this.cancellation){
            var kale_inner_btn_cancel = document.createElement('button');
            var btn_cancel = document.createTextNode(this.cancelText);
            kale_inner_btn_cancel.appendChild(btn_cancel);
            kale_inner_btn_cancel.onclick = function() { cancel(); };
            kale_inner_btn_cancel.style.backgroundColor = '#ff322e';
            kale_inner_btn_cont.appendChild(kale_inner_btn_cancel);
        }
        document.body.appendChild(kale_cont);
        if(this.input){
            kale_inner_input.focus();
        }else if(this.textarea){
            kale_inner_textarea.focus();
        }

    }
    return new Promise(function(resolved , reject){
        this.show();
        document.body.addEventListener("keypress", function(e) {
            if (e.keyCode == 27) { 
                cancel();
            }
        });
        this.ok = function(val){
            document.getElementById('kale').remove();
            document.body.classList.remove("noScroll");
            return resolved(val);
        }
        
        this.cancel = function(){
            document.getElementById('kale').remove();
            document.body.classList.remove("noScroll");
            return resolved(false);
        }
    });
}
