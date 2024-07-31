# jQuery-Easy-Toggle
Flexible easy targeted toggle library

# How to Execute

```
### Source
<div class="click_toogle_init" data-target="#aabbcc" data-targetState="visible">Yahoo</div>


### Target
<div id="aabbcc">
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
	quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
	proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

<script type="text/javascript">
	
	jQuery('.click_toogle_init').click_toogle({
		target 				: '#aabbcc',
		targetState 		: 'visible',
		toogle_screen_sizes : {
			550 				: true,
		},
	});

</script>

```
