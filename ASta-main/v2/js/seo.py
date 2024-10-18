import requests

def analyze_url_status_codes(url):
    response = requests.get(url)
    status_code = response.status_code
    if status_code == 200:
        print(f"URL {url} is OK")
    elif status_code == 404:
        print(f"URL {url} is broken (404)")
    elif status_code == 301:
        print(f"URL {url} is redirected (301)")
    else:
        print(f"URL {url} has status code {status_code}")

# Example usage:
analyze_url_status_codes("https://litestream.netlify.app/index.html")

from bs4 import BeautifulSoup
import requests

def analyze_on_page_seo_elements(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    title = soup.find('title').text
    meta_description = soup.find('meta', attrs={'name': 'description'})['content']
    headers = [h.text for h in soup.find_all(['h1', 'h2', 'h3'])]
    print(f"Title: {title}")
    print(f"Meta Description: {meta_description}")
    print(f"Headers: {headers}")

# Example usage:
analyze_on_page_seo_elements("https://litestream.netlify.app/anime.html")

import requests

def analyze_page_speed(url):
    api_key = "YOUR_API_KEY"
    api_url = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&key={api_key}&strategy=mobile"
    response = requests.get(api_url)
    result = response.json()
    speed_score = result['lighthouseResult']['categories']['performance']['score'] * 100
    print(f"Page Speed Score (Mobile): {speed_score}")

# Example usage:
analyze_page_speed("https://litestream.netlify.app/anime.htm")

from googleapiclient.discovery import build
import pandas as pd

def automate_keyword_research():
    api_key = "YOUR_API_KEY"
    cse_id = "YOUR_CSE_ID"
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q="anime", cx=cse_id).execute()
    keywords = [item['title'] for item in res['items']]
    df = pd.DataFrame(keywords, columns=['Keyword'])
    print(df)

# Example usage:
automate_keyword_research()