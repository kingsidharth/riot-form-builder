

riot.tag2('c-form', '<form id="{opts.config.id}" method="{opts.config.method}" onsubmit="{opts.config.submit}" action="{opts.config.action}"> <div class="u-no-list c-form"> <div each="{field in opts.form}" field="{field}" data-is="o-input-group" class="c-form__item"> </div> <div class="c-form__item"> <input type="submit" class="o-button o-button--primary" riot-value="{opts.config.submit_text}"> </div> </div> </form>', '', '', function(opts) {
  require('./o-input-collection.tag.html');
  require('./o-input-group.tag.html');
  require('./o-input-radio-types.tag.html');

  var tag = this;

  tag.opts.config = {
    method: 'GET',
    action: ''
  }

  this.clear = function(tag) {
    return tag[tag.opts.js_id].reset();
  }.bind(this)
});

riot.tag2('o-input-collection', '<input each="{child, i in opts.children.new}" type="hidden" riot-value="{child.id}" name="{field.name + \'[\' + i +  \']\'}"> </input> <div class="c-input--collection"> <div class="c-card c-card--high"> <div each="{exisiting_child in opts.field.value}" class="c-card__item"> {exisiting_child.name} | <a onclick="{delete_child}" href="#">Delete</a> </div> <div if="{opts.children.new.length}" class="c-card__item c-card__item--divider"> New: </div> <div each="{child in opts.children.new}" class="c-card__item"> {child.name} | <a onclick="{delete_child}" href="#">Delete</a> </div> </div> <div class="c-input-group"> <select onchange="{change}" class="[ o-input-group__field ][ o-field o-field--select ][ c-field ]"> <option each="{option in opts.field.options}" riot-value="{option[1]}" selected="{option[2]}"> {option[0]} </option> </select> <button onclick="{add_child}" class="[ c-button c-button--ghost-primary ]"> Add as a Child </button> </div> </div>', '', '', function(opts) {
  var tag = this;

  tag.opts.children = {
    new: []
  };

  tag.on('unmount', () => { tag.off('*')});

  this.change = function(e) {
    let item = _.filter(e.item.field.options, function(o){
      return o[1] === parseInt(e.target.value);
    });

    if(!!item.length) {
      tag.opts.new_child = {
        name: item[0][0],
        id:   item[0][1]
      }
    }
  }.bind(this)

  this.add_child = function(e) {
    tag.opts.children.new.push(tag.opts.new_child);
    tag.opts.new_child = false;
    tag.update();
  }.bind(this)

  this.delete_child = function(e){
    let new_children = _.reject(
      tag.opts.children.new,
      (o) => { return o.id === parseInt(e.item.child.id) }
    );

    tag.opts.children.new = new_children;
    tag.update();
  }.bind(this)
});



riot.tag2('o-input-group', '<label if="{opts.field.label && ( field_input_type(opts.field.type) != \'radio_types\' )}" for="{opts.field.name}" class="[ o-input-group__label ]"> {opts.field.label} <span class="[ o-input-group__label__required ]" if="{opts.field.required}">*<span>: </label> <input if="{field_input_type(opts.field.type) == \'text\'}" name="{opts.field.name}" type="{opts.field.type}" placeholder="{opts.field.placeholder}" required="{opts.field.required}" maxlength="{opts.field.maxlength}" max="{opts.field.max}" step="{opts.field.step}" riot-value="{opts.field.value}" onchange="{opts.field.change}" class="[ o-input-group__field ][ o-field o-field--text ][ c-field ]"> </input> <select if="{field_input_type(opts.field.type) == \'select\'}" name="{opts.field.name}" required="{opts.field.required}" onchange="{opts.field.change}" class="[ o-input-group__field ][ c-field o-field o-field--select ]"> <option each="{option in opts.field.options}" selected="{!!option[2] ? \'selected\' : false}" riot-value="{option[1]}"> {option[0]} </option> </select> <o-input-collection if="{field_input_type(opts.field.type) == \'collection\'}" field="{opts.field}"> </o-input-collection> <span if="{field_input_type(opts.field.type) == \'radio_types\'}"> <o-input-radio-types field="{opts.field}"></o-input-radio-types> </span>', '', 'class="[ o-input-group ]"', function(opts) {
    var tag = this;

    tag.on('unmount', () => { tag.off('*') });

    get_field_input_type = function(input_types, field_type) {
      return _.findKey(input_types, (o) => { return _.includes(o, field_type )});
    }

    this.field_input_type = function(field_type) {
      let types = {
        text: ['text', 'textarea', 'password', 'email', 'number'],
        select: ['options', 'select'],
        collection: ['collection'],
        radio_types: ['checkbox', 'radio', 'switch']
      };
      return get_field_input_type(types, field_type);
    }.bind(this)

});

riot.tag2('o-input-radio-types', '<label if="{opts.field.label}" for="{opts.field.name + \'\'}" class="[ o-input-group__label ]"> <input if="{field.type == \'checkbox\'}" type="checkbox" name="{field.name}" onchange="{checkbox_change}" checked="{!!field.value}" riot-value="{!!field.value}"> {field.label} </label>', '', '', function(opts) {
  var tag = this;

  this.checkbox_change = function(e) {
    tag.opts.field.value = !!e.target.checked;
    tag.update();
  }.bind(this)
});
