$(document).ready(function() {
    let originalPosterSrc = '';

    $('#movieSearch').on('input', function() {
        let title = $(this).val();
        if (title.length > 2) {
            $.get('/search', { title: title }, function(data) {
                $('#suggestions').empty().addClass('active');
                data.forEach(function(movie) {
                    $('#suggestions').append('<div class="movie-item">' + movie.Title + ' (' + movie.Year + ')</div>');
                });
            });
        } else {
            $('#suggestions').empty().removeClass('active');
        }
    });

    $(document).on('click', '.movie-item', function() {
        let movieInfo = $(this).text().match(/(.*) \((\d{4})\)/);
        let movieTitle = movieInfo[1];
        let movieYear = movieInfo[2];
        
        $.get('/poster', { title: movieTitle }, function(data) {
            if (data.poster) {
                originalPosterSrc = data.poster;
                $('#poster').attr('src', originalPosterSrc).show();
                $('#movieTitle').text(movieTitle);
                $('#movieYear').text('Year: ' + movieYear);
                $('#movieRating').text('IMDb Rating: ' + (data.rating || 'N/A'));
                $('#posterContainer').show();
                $('#downloadButton').show();
            } else {
                alert('Poster not found!');
            }
        });
        
        $('#suggestions').empty().removeClass('active');
        $('#movieSearch').val(movieTitle);
    });

    // Hide suggestions when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-container').length) {
            $('#suggestions').empty().removeClass('active');
        }
    });

        // Update poster source based on selected resolution
        $('#resolutionSelect').on('change', function() {
            const selectedSize = $(this).val();  // Get selected size

            // Update the poster source based on the resolution
            if (originalPosterSrc) {
                let newSrc = originalPosterSrc.replace(/(SX|L|XL)(\d+)/g, function(match, prefix) {
                    // Change the prefix based on the selection
                    if (selectedSize === '100p') {
                        return 'SX300'; // Small
                    } else if (selectedSize === '300p') {
                        return 'L300'; // Medium
                    } else if (selectedSize === '400p') {
                        return 'XL400'; // Large
                    }
                    return match; // Return original if no match
                });

                console.log('Updated poster source:', newSrc); // Debugging line
                $('#poster').attr('src', newSrc);  // Update the image displayed
            }
        });

        // Directly download the adjusted size
        $('#downloadButton').on('click', function() {
            let link = document.createElement('a');
            const selectedSize = $('#resolutionSelect').val(); // Get the selected size

            // Construct the download URL based on the selected resolution
            let downloadSrc = originalPosterSrc.replace(/(SX|L|XL)(\d+)/g, function(match, prefix) {
                // Change the prefix based on the selection
                if (selectedSize === '100p') {
                    return 'SX300'; // Small
                } else if (selectedSize === '300p') {
                    return 'L300'; // Medium
                } else if (selectedSize === '400p') {
                    return 'XL400'; // Large
                }
                return match; // Return original if no match
            });

            console.log('Downloading from URL:', downloadSrc); // Log for debugging

            link.href = downloadSrc; // Set the link to the image source
            link.setAttribute('download', movieTitle + '.jpg');  // Set the download name
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link); // Clean up
        });
    });