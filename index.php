<?	// create $root path
function root($path){
	$ho = explode('/', dirname($path));
	$hom = array_reverse($ho);
	if($hom[0]=='public_html' || $hom[0]=='homepage'):
		return('./');
	else:
		if(in_array('public_html', $hom)):
			$key = array_search('public_html', $hom);
		elseif(in_array('homepage', $hom)):
			$key = array_search('homepage', $hom);
		endif;
		for($i=0; $i<$key; $i++):
			$num[] = '..';
		endfor;
		return(implode('/', $num).'/');
	endif;
}
$root = root($_SERVER['SCRIPT_FILENAME']);

include_once($root.'src/php.php'); ?>
<!DOCTYPE html><html><head>

  <meta charset="UTF-8">

  <title>title</title>

  <link rel="stylesheet" href="./modules/html/html.css">
  <link rel="stylesheet" href="client.css">

  <script src="./modules/html/index.js"></script>
  <!-- <script src="./modules/navigation/index.js"></script>
  <script src="https://unpkg.com/masonry-layout/dist/masonry.pkgd.js"></script>
  <script src="./modules/grid/index.js"></script>
  <script src="./modules/mysql/index.js"></script>
  <script src="./modules/display/index.js"></script> -->

  <script src="client.js"></script>

</head><body>

  <header><h1>headline</h1></header>

  <nav>navigation
    <!-- <span class="category" data-data="a">A</span>
    <span class="category" data-data="b">B</span>
    <span class="category" data-data="c">C</span>
    &#160; | &#160;
    <span class="color" data-data="bw">Black & White</span>
    &#160;
    <span class="color" data-data="color">Color</span> -->
  </nav>

  <main>

    <section>

      <template>
        <article class="block" data-name="">
          <figure>
            <img src="" alt="">
            <figcaption>figcaption</figcaption>
          </figure>
          <details>
            <summary>details summary</summary>
            details
          </details>
        </article>
      </template>

    </section>

    <aside>

      <template>
        <article class="" data-name="">
          <header><h4>header</h4></header>
          <details>
            <summary>details summary</summary>
            details
          </details>
        </article>
      </template>

    </aside>

  </main>

  <footer></footer>

</body></html>
