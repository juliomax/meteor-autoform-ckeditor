Template.MathInputBox.onRendered(function() {
    var mathFieldSpan = document.getElementById('math-field');

    var MQ = MathQuill.getInterface(2); // for backcompat
    this.mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true
    });
})

Template.MathInputBox.events({
    'click .sqr' (event, instance) {
        instance.mathField.cmd('^');
    },
    'click .pls' (event, instance) {
        instance.mathField.cmd('+');
    },
    'click .min' (event, instance) {
        instance.mathField.cmd('-');
    },
    'click .mul' (event, instance) {
        instance.mathField.cmd('\\cdot');
    },
    'click .div' (event, instance) {
        instance.mathField.cmd('\\frac');
    },
    'click .sqrt' (event, instance) {
        instance.mathField.cmd('\\sqrt');
    },
    'click .sqrt3' (event, instance) {
        instance.mathField.write('\\sqrt[3]{}');
    },
    'click .pi' (event, instance) {
        instance.mathField.write('\\pi');
    },
    'click #math-field' (event) {
        var $target = $("#displayExpress");

        //$target.fadeIn(300);
        $target.css('display','show');
    }
})
