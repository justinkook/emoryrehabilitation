/**
 * Date: 10/13/2018
 * @version 1.0 
 * @author David Ye
 * @description
 *  1.0
 *  - Script to build certain elements by inputting the proper json data.
 *  - buildIndivBusinessBlock returns a string of html to append to the results page.
 */

let count = 0;

/**
 * Builds a block of html string to render to results page
 * @since 1.0
 * @param {Object} businessData 
 * @returns {String} business element html
 */
const buildIndivBusinessBlock = function (businessData) {
    count++;
    let businessElement = '';
    businessElement += `<div class='media-block'>`;
    businessElement += `<div class='media-story'>`;
    businessElement += `<div class='biz-attributes'>`;
    businessElement += `<div class='main-attributes'>`;
    businessElement += `<div class='search-result-title'><span class='indexed-biz-name'>${count}. <a id=${businessData.id} class='biz-name'  href='business?alias=${businessData.alias}'><span id='${businessData.alias}'>${businessData.name}</span></a></span></div>`;
    businessElement += `</div>`;
    businessElement += `<div class='secondary-attributes'>`;
    businessElement += `<span class='biz-phone'>${formatPhoneNumbers(businessData.phone)}</span>`;
    businessElement += `<address class='biz-address'>${businessData.location.address1}</address>`;
    businessElement += `<span class='neighborhood-str-list'>${businessData.location.city}, ${businessData.location.state} ${businessData.location.zip_code}</span>`;
    businessElement += `</div>`;
    businessElement += `</div>`;
    businessElement += `<div class='biz-extra-info'>`;
    businessElement += `<div class='price-category'><span class='category-list'>${anchorCategories(businessData.categories)}</span></div>`;
    businessElement += `</div>`;
    businessElement += `</div>`;
    businessElement += `</div>`;
    return businessElement;
}

/**
 * Takes an array of categories and wraps it in anchor tags
 * @since 1.0
 * @param {Array} categories
 * @returns {String} a set of anchor tag htmls to populate the business block 
 */
const anchorCategories = function (categories) {
    let html = "";
    categories.forEach(category => { html += `<a href="#">${category.title}</a>,  ` });
    html = html.substring(0, html.lastIndexOf(","));
    return html;
}

/**
 * Takes a phone number from the database and reformats it
 * to display properly in the business block
 * Ex: +14048733088 --> (404) 873-3088
 * @since 1.0
 * @param {String} phoneNumber 
 * @returns {String} a formatted phone number
 */
const formatPhoneNumbers = function (phoneNumber) {
    //     'phone': '+14048733088'
    let noCountryCode = phoneNumber.substring(2);
    let areaCode = noCountryCode.substring(0, 3);
    let prefix = noCountryCode.substring(3, 6);
    let lineNumber = noCountryCode.substring(6);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
}

/**
 * Dynamically calculates the class to add to 
 * the star ratings element in order to properly 
 * display the right amount of stars.
 * @since 1.0
 * @param {Integer} rating
 * @returns {String} the class that displays the right stars
 */
const getStarRatingClass = function (rating) {
    let stringRating = rating.toString();
    stringRating = stringRating.replace(".", "-");
    return `star-rating-${stringRating}`;
}

/** API for potential future elements */
const build = {
    businessBlock: buildIndivBusinessBlock,
    count: count
}

/** Test json for testing code. Represents the data of one business entity */
const testJson = {
    '_id': '5bb6bacc6b166a662080d323',
    'id': 'ZMEZgMF9FkgR9yl_RJkWfQ',
    'alias': 'fellinis-pizza-atlanta',
    'name': 'Fellinis Pizza',
    'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/l0pFkkzJF3mUTMoxrKv3wA/o.jpg',
    'is_closed': false,
    'url': 'https://www.yelp.com/biz/fellinis-pizza-atlanta?adjust_creative=cmzVxWTsJIZNaQUCYD1Cmg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=cmzVxWTsJIZNaQUCYD1Cmg',
    'review_count': 400,
    'categories': [
        {
            'alias': 'pizza',
            'title': 'Pizza'
        }
    ],
    'rating': 4,
    'coordinates': {
        'latitude': 33.7734718322754,
        'longitude': -84.357666015625
    },
    'transactions': '',
    'price': '$',
    'location': {
        'address1': '909 Ponce De Leon Ave NE',
        'address2': '',
        'address3': '',
        'city': 'Atlanta',
        'zip_code': '30306',
        'country': 'US',
        'state': 'GA',
        'display_address': [
            '909 Ponce De Leon Ave NE',
            'Atlanta, GA 30306'
        ]
    },
    'phone': '+14048733088',
    '__v': 0
}